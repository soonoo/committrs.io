import React from 'react';
import { withLocale } from 'context';
import languagePack from 'constants/languagePack';
import { SERVER_HOST } from 'constants/urls';

const LoginButton = ({ locale }) => {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=${SERVER_HOST}/auth/github/token`}
    >
      {languagePack[locale]['loginButton']}
    </a>
  );
};

export default withLocale(LoginButton);

