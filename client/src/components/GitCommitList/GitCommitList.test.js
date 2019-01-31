import React from 'react';
import { shallow } from 'enzyme';
import GitCommitList from './';
import GitCommitItem from '../GitCommitItem';

let wrap;
const repoPath = 'soonoo/blogggg';
const commits = [
  {
    hash: 'c509aaced86fc120a2521b40303a88692dee8104',
    message: 'fix: this is test commit!!!!',
    stat: {
      added: 123,
      deleted: 234,
    },
  },
  {
    hash: 'c23rwerlkgjndfl4n4534534303a88692dee8104',
    message: 'fix: this is test commit!!!!',
    stat: {
      added: 123,
      deleted: 234,
    },
  },
];

describe('GitCommitItemList.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<GitCommitList repoPath={repoPath} commits={commits} />);
  });

  it('renders repoPath', () => {
    expect(wrap.find('.repo-path').text()).toEqual(repoPath);
  });

  it('title element has a link to GitHub repo', () => {
    expect(wrap.find('.repo-link').prop('href')).toEqual(`https://github.com/${repoPath}`);
  });

  it('renders commits', () => {
    expect(wrap.find(GitCommitItem)).toHaveLength(commits.length);
  });
});

