import React from 'react';
import { SERVER_HOST, GITHUB_ID } from 'constants/index';

const LoginButton = () => {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&redirect_uri=${SERVER_HOST}/v1/auth/github/token`}
    >
      Getting started with your GitHub account
    </a>
  );
};

export default LoginButton ;

