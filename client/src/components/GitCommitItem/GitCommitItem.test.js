import React from 'react';
import { shallow } from 'enzyme';
import GitCommitItem from './';

let wrap;
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
  it('renders without crashing', () => {
    wrap = shallow(<GitCommitItem commitInfo={commitInfo} />);
  });

  it('renders prop', () => {
    expect(wrap.find('.commit-link').prop('href')).toEqual(`https://github.com/${commitInfo.repoPath}/commit/${commitInfo.hash}`);
    expect(wrap.find('.commit-hash').text()).toEqual(commitInfo.hash);
    expect(wrap.find('.commit-message').text()).toEqual(commitInfo.message);
  });
});

