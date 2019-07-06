import React from 'react';
import MainPagePhrase from 'components/MainPagePhrase';
import GithubLoginButton from 'components/GithubLoginButton';

import './landing.css';

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='wrapper'>
        <MainPagePhrase/>
        <GithubLoginButton />
      </div>
    </div>
  );
};

export default LandingPage;

