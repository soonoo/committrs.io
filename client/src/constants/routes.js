import React from 'react';
import LandingPage from 'pages/landing';

export default [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    component: () => <div />,
  },
  {
    path: '/rank',
    component: () => <div />,
  },
];

