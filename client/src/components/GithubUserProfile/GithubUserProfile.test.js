import React from 'react';
import { shallow } from 'enzyme';
import GithubUserProfile from './';

let wrap;
const githubProfileProp = {
  profileImgSrc: 'https://github.com/abc/def',
  userName: 'soonoo',
};

describe('GithubUserProfile.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<GithubUserProfile profileInfo={githubProfileProp} />);
  });

  it('renders profile image', () => {
    expect(wrap.find('.profile-img').prop('src')).toEqual(githubProfileProp.profileImgSrc);
  })

  it('renders user name', () => {
    expect(wrap.find('.profile-user').text()).toEqual(githubProfileProp.userName);
  })
});


