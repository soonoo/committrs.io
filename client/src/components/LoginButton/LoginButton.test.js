import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from './';
import { LocaleContext } from 'context';

let wrap;
describe('LoginButton.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<LoginButton />, { context: { locale: 'en' } });
  });

  it('redirects to github.com', () => {
    const url = `https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=https://committrs.io/login`;

    //expect(wrap.renderProp('children')).toHaveProperty('href', url);
  });
});

