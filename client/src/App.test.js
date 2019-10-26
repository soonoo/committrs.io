import React from 'react';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

describe('App.js', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});

