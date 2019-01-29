import React from 'react';
import { shallow } from 'enzyme';
import GitCommitItem from './';

let wrap;
const commitInfo = {
  hash: 'c509aaced86fc120a2521b40303a88692dee8104',
  message: 'fix: this is test commit!!!!',
  stat: {
    added: 123,
    deleted: 234,
  },
};

describe('GitCommitItem.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<GitCommitItem commitInfo={commitInfo} />);
  });

  it('renders prop', () => {
    expect(wrap.find('.commit-hash').text()).toEqual(commitInfo.hash);
    expect(wrap.find('.commit-message').text()).toEqual(commitInfo.message);
  });
});

