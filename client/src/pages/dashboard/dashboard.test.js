import React from 'react';
import { render } from 'react-testing-library';
import DashboardPage from './';

let wrap;
describe('dashboard page', () => {
  it('renders without crashing', () => {
    wrap = render(<DashboardPage />);
  });
});

