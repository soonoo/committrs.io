import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import { store } from 'store';
import RepoItem from './';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
    })
  };
});

// const RepoItem = ({ owner, name, id: repoId, totalCommits, starsCount, description, languages }) => {
const props = {
  owner: 'soonoo',
  name: 'committrs',
  commitsCount: 12133,
  id: 91,
  totalCommits: 456,
  starsCount: 100,
  description: 'hello world',
  languages: 'javascript,java,c,c++',
}

describe('RepoItem.js', () => {
  const { getByText, container, queryByText } = render(<Provider store={store}><RepoItem {...props} /></Provider>);
  const { owner, name, commitsCount } = props;

  it('renders without crash', () => {
    expect(getByText(`${owner}/${name}`)).toBeDefined();
  });

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

