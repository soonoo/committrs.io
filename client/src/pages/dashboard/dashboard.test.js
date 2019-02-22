import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from './';

let wrap;
describe('dashboard page', () => {
  it('renders without crashing', () => {
    wrap = shallow(<DashboardPage />);
  });
});

