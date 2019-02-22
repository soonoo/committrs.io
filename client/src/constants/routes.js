import React from 'react';
import LandingPage from 'pages/landing';
import DashboardPage from 'pages/dashboard';

export default [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '/rank',
    component: () => <div />,
  },
];

