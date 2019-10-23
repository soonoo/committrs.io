import React from 'react';
import { GITHUB_LOGIN_URL } from 'constants/index';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

const GithubLoginButton = () => {
  const login = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  return (
    <button onClick={login} className='github-login'>
      <GoMarkGithub className='logo' size={20} />
      <span className='desc'>Continue with GitHub</span>
    </button>
  );
};

export default GithubLoginButton;

