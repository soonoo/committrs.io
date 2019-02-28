import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import UserRepoItem from './';

const props = {
  owner: 'soonoo',
  name: 'committrs',
  commitsCount: 12133,
  commits: [
    {
      hash: 'c509aaced86fc120a2521b40303a88692dee8104',
      message: 'fix: this is test commit!!!!',
      stat: {
        addition: 123,
        deletion: 234,
      },
    },
    {
      hash: 'c23rwerlkgjndfl4n4534534303a88692dee8104',
      message: 'fix: this is test commit!!!!',
      stat: {
        addition: 123,
        deletion: 234,
      },
    },
  ],
}

describe('UserRepoItem.js', () => {
  const { getByText, container, queryByText } = render(<UserRepoItem {...props} />);
  const { owner, name, commitsCount } = props;

  it('renders repo owner and name in `owner/name` form', () => {
    expect(getByText(`${owner}/${name}`)).toBeDefined();
  });

  it('renders total count of commits in repo', () => {
    expect(getByText(commitsCount.toString())).toBeDefined();
  });

  it('do not renders commits before click', () => {
    for(const commit of props.commits) {
      expect(queryByText(commit.hash)).toBeNull();
      expect(queryByText(commit.message)).toBeNull();
      expect(queryByText(commit.stat.addition.toString())).toBeNull();
      expect(queryByText(commit.stat.deletion.toString())).toBeNull();
    }
  });

  it('renders commits in repository when repo title is clicked', () => {
    fireEvent.click(container.firstChild);

    for(const commit of props.commits) {
      const link = `https://github.com/${commit.repoPath}/commit/${commit.hash}`;
      expect(getByText(commit.hash).getAttribute('href')).toEqual(link);
      expect(getByText(commit.message)).not.toBeNull();
      expect(getByText(commit.stat.addition.toString())).not.toBeNull();
      expect(getByText(commit.stat.deletion.toString())).not.toBeNull();
    }
  });

  it('do not renders commits in repository when repo title is clicked twice', () => {
    fireEvent.click(container.firstChild);

    for(const commit of props.commits) {
      expect(queryByText(commit.hash)).toBeNull();
      expect(queryByText(commit.message)).toBeNull();
      expect(queryByText(commit.stat.addition.toString())).toBeNull();
      expect(queryByText(commit.stat.deletion.toString())).toBeNull();
    }
  });
});

