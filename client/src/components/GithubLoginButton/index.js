import React from 'react';
import { ReactComponent as GithubLogo } from 'images/github-logo.svg';
import { SERVER_HOST, GITHUB_ID } from 'constants/index';

const GithubLoginButton = () => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&redirect_uri=${SERVER_HOST}/v1/auth/github/token`;
  const login = () => {
    window.location.href = url;
  }

  return (
    <div onClick={login} className='github-login'>
      <GithubLogo className='logo' />
      <span className='desc'>Continue with GitHub</span>
    </div>
  );
};

export default GithubLoginButton;

