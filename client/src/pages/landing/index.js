import React from 'react';
import MainPagePhrase from 'components/MainPagePhrase';
import LoginButton from 'components/LoginButton';

const LandingPage = () => {
  return (
    <div>
      <MainPagePhrase text='Collect your commits scattered over open sources.'/>
      <LoginButton />
    </div>
  );
};

export default LandingPage;

