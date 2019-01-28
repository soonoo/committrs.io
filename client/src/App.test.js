import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';

let wrap;
const routes = [ '/', '/dashboard', '/rank', ];

describe('App.js', () => {
  it('renders without crashing', () => {
    wrap = mount(<App />);
  });

  it(`renders ${routes.length} routes`, () => {
    expect(wrap.find(Route)).toHaveLength(3);
  });

  it('renders routes with correct path', () => {
    routes.forEach((path) => {
      expect(wrap.find({ path })).toHaveLength(1);
    })
  });
});

