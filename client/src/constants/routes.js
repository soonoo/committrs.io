import LandingPage from 'pages/landing';
import DashboardPage from 'pages/dashboard';
import SettingsPage from 'pages/settings';
import { fetchUserRequestServer } from 'store/actions/user';

export default [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
  // {
  //   path: '/rank',
  //   component: () => <div />,
  // },
  {
    path: '/:userName',
    component: DashboardPage,
    loadData: (store, match) => {
      store.dispatch(fetchUserRequestServer(match.params.userName));
    },
  },
];

