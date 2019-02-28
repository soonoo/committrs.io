import React from 'react';
import { render } from 'react-testing-library';
import RepoList from './';

const repoList= [
  {
    owner: 'soonoo1',
    name: 'committrs1',
    commitsCount: 13,
    id: 1,
  },
  {
    owner: 'soonoo2',
    name: 'committrs2',
    commitsCount: 23,
    id: 32,
  },
  {
    owner: 'soonoo3',
    name: 'committrs3',
    commitsCount: 123,
    id: 333,
  },
];

describe('RepoList.js', () => {
  const { getByText } = render(<RepoList repos={repoList} />);

  it('renders three RepoItem component', () => {
    for(const repo of repoList) {
      const { owner, name, commitsCount } = repo;
      expect(getByText(`${owner}/${name}`)).toBeDefined();
      expect(getByText(commitsCount.toString())).toBeDefined();
    }
  });
});

