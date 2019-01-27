import React from 'react';
import { shallow } from 'enzyme';
import MainPagePhrase from './';

let wrap;
const text = 'welcom home';

describe('MainPagePhrase.js', () => {
  it('renders without crashing', () => {
    wrap = shallow(<MainPagePhrase text={text}/>);
  });

  it('renders text from prop', () => {
    expect(wrap.text()).toEqual(text);
  });
});

