import React from 'react';
import { render } from 'react-testing-library';
import CommitList from './';

const repoPath = 'soonoo/blogggg';
const commits = [
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
];

describe('GitCommitList.js', () => {
  const { getByText } = render(<CommitList repoPath={repoPath} commits={commits} />);

  it('renders commits', () => {
    for(const commit of commits) {
      const link = `https://github.com/${commit.repoPath}/commit/${commit.hash}`;
      expect(getByText(commit.hash).getAttribute('href')).toEqual(link);
      expect(getByText(commit.message)).toBeDefined();
      expect(getByText(commit.stat.addition.toString())).toBeDefined();
      expect(getByText(commit.stat.deletion.toString())).toBeDefined();
    }
  });
});

