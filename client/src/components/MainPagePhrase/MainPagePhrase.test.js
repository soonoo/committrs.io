import React from 'react';
import { render } from 'enzyme';
import MainPagePhrase from './';
import { LocaleContext } from 'context';

describe('MainPagePhrase.js', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <LocaleContext.Provider value='en'>
        <MainPagePhrase />
      </LocaleContext.Provider>
    );
  });
});

