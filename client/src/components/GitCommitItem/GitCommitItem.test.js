import React from 'react';
import { render } from 'react-testing-library';
import GitCommitItem from './';

const commitInfo = {
  repoPath: 'soonoo/blogggg',
  hash: 'f7973c884ccfd03446218b9e5ec731e319a1c9c2',
  message: 'fix: this is test commit!!!!',
  stat: {
    addition: 123,
    deletion: 234,
  },
};

describe('GitCommitItem.js', () => {
  const { getByText } = render(<GitCommitItem commitInfo={commitInfo} />);

  it('renders prop', () => {
    const link = `https://github.com/${commitInfo.repoPath}/commit/${commitInfo.hash}`;
    expect(getByText(commitInfo.hash).getAttribute('href')).toEqual(link);
    expect(getByText(commitInfo.message)).toBeDefined();
    expect(getByText(commitInfo.stat.addition.toString())).toBeDefined();
    expect(getByText(commitInfo.stat.deletion.toString())).toBeDefined();
  });
});

