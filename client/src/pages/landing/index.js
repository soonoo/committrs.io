import React from 'react';
import MainPagePhrase from 'components/MainPagePhrase';
import GithubLoginButton from 'components/GithubLoginButton';
import Header from 'components/Header';
import { Helmet } from 'react-helmet';

import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>committrs.io - Get your profile page for open source contrbutions.</title>
      </Helmet>
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

