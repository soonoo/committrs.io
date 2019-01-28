import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from './';

let wrap;
describe('LoginButton.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<LoginButton />);
  });

  it('redirects to github.com', () => {
    const url = `https://github.com/login/oauth/authorize?client_id=435deb42a14081c0a9bf&redirect_uri=https://committrs.io/login`;

    expect(wrap.find('a').props()).toHaveProperty('href', url);
  });

  it('has inner text "GitHub으로 시작하기"', () => {
    expect(wrap.find('a').text()).toEqual('GitHub으로 시작하기');
  });
});

