import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
import routes from './constants/routes';

let wrap;
describe('App.js', () => {
  it('renders without crashing', () => {
    wrap = mount(<App />);
  });

  it(`renders ${routes.length} routes`, () => {
    expect(wrap.find(Route)).toHaveLength(3);
  });

  it('renders routes with correct name', () => {
    routes.forEach((route) => {
      expect(wrap.find({ path: route.path })).toHaveLength(1);
    })
  });
});

