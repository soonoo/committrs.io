import React from 'react';
import { render } from 'react-testing-library';
import GithubUserProfile from './';

const githubProfileProp = {
  profileImgSrc: 'https://github.com/abc/def',
  userName: 'soonoo',
};

describe('GithubUserProfile.js', () => {
  const { getByText, getByAltText } = render(<GithubUserProfile profileInfo={githubProfileProp} />);

  it('renders profile image', () => {
    expect(getByAltText('github user profile image').getAttribute('src')).toEqual(githubProfileProp.profileImgSrc);
  });

  it('renders user name', () => {
    expect(getByText(githubProfileProp.userName)).toBeDefined();
  });
});


