import React from 'react';
import { shallow } from 'enzyme';
import UserRepoList from './';

let wrap;
describe('UserRepoList.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<UserRepoList />);
  });
});

