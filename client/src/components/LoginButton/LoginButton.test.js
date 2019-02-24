import React from 'react';
import LoginButton from './';
import { LocaleContext } from 'context';
import { render } from 'react-testing-library';
import { SERVER_HOST } from 'constants/urls';

describe('LoginButton.js', () => {
  const { getByText } = render(
    <LocaleContext.Provider value='en'>
      <LoginButton />
    </LocaleContext.Provider>
  );

  it('redirects to github.com', () => {
    const url = `https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=${SERVER_HOST}/auth/github`;

    expect(getByText(/^Getting/).getAttribute('href')).toEqual(url);
  });
});

