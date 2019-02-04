import React from 'react';
import { withLocale } from 'context';
import languagePack from 'constants/languagePack';

const LoginButton = ({ locale }) => {
  return (
    <a
      href='https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=https://committrs.io/login'
    >
      {languagePack[locale]['loginButton']}
    </a>
  );
};

export default withLocale(LoginButton);

