import React from 'react';
import LandingPage from 'pages/landing';
import DashboardPage from 'pages/dashboard';

export default [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/rank',
    component: () => <div />,
  },
  {
    path: '/:userName',
    component: DashboardPage,
  },
];

