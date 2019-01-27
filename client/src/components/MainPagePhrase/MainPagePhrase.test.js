import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MainPagePhrase from './';

describe('MainPagePhrase.js', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MainPagePhrase text='text' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders text from prop', () => {
    const text = 'welcom home';
    const wrap = shallow(<MainPagePhrase text={text} />);

    expect(wrap.text()).toEqual(text);
  });
});

