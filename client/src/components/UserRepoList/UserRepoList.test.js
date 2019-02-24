import React from 'react';
import { shallow } from 'enzyme';
import UserRepoList from './';
import UserRepoItem from '../UserRepoItem';

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
let wrap;

describe('UserRepoList.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<UserRepoList repos={repoList} />);
  });

  it('renders three UserRepoItem component', () => {
    expect(wrap.find(UserRepoItem)).toHaveLength(3);
  });
});

