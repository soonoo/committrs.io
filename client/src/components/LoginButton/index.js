import React from 'react';
import { withLocale } from 'context';
import languagePack from 'constants/languagePack';
import { SERVER_HOST, GITHUB_ID } from 'constants/index';

const LoginButton = ({ locale }) => {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&redirect_uri=${SERVER_HOST}/v1/auth/github/token`}
    >
      {languagePack[locale]['loginButton']}
    </a>
  );
};

export default withLocale(LoginButton);

