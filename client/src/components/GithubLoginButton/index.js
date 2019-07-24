import React from 'react';
import { SERVER_HOST, GITHUB_ID } from 'constants/index';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

const GithubLoginButton = () => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&redirect_uri=${SERVER_HOST}/v1/auth/github/token`;
  const login = () => {
    window.location.href = url;
  }

  return (
    <button onClick={login} className='github-login'>
      <GoMarkGithub className='logo' size={20} />
      <span className='desc'>Continue with GitHub</span>
    </button>
  );
};

export default GithubLoginButton;

