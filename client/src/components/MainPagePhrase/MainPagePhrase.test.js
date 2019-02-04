import React from 'react';
import { shallow } from 'enzyme';
import MainPagePhrase from './';

let wrap;

describe('MainPagePhrase.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<MainPagePhrase />);
  });
});

