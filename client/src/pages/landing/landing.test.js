import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './';
import LoginButton from 'components/LoginButton';
import MainPagePhrase from 'components/MainPagePhrase';

let wrap;
describe('landing page', () => {
  it('renders without crashing', () => {
    wrap = shallow(<LandingPage />);
  });

  it('renders login button', () => {
    expect(wrap.find(LoginButton)).toHaveLength(1);
  });

  it('renders phrase', () => {
    expect(wrap.find(MainPagePhrase)).toHaveLength(1);
  });
});

