import React from 'react';
import GithubLogo from 'images/github-logo.svg';

const GithubLoginButton = () => {
  return (
    <div className='github-login'>
      <img className='logo' src={GithubLogo} />
      <span className='desc'>Continue with GitHub</span>
    </div>
  );
};

export default GithubLoginButton;

