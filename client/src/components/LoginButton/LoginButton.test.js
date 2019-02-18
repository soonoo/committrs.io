import React from 'react';
import LoginButton from './';
import { LocaleContext } from 'context';
import { render } from 'react-testing-library';
import { SERVER_HOST } from 'constants/urls';

let wrap;
describe('LoginButton.js', () => {
  it('renders without crashing', () => {
    wrap = render(
      <LocaleContext.Provider value='en'>
        <LoginButton />
      </LocaleContext.Provider>
    );
  });

  it('redirects to github.com', () => {
    const url = `https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=${SERVER_HOST}/auth/github`;

    expect(wrap.getByText(/^Getting/).getAttribute('href')).toEqual(url)
  });
});

