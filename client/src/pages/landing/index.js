import React from 'react';
import MainPagePhrase from 'components/MainPagePhrase';
import GithubLoginButton from 'components/GithubLoginButton';
import Header from 'components/Header';

import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className='landing'>
        <div className='wrapper'>
          <MainPagePhrase/>
          <GithubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

