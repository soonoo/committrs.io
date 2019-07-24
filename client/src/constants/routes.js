import LandingPage from 'pages/landing';
import DashboardPage from 'pages/dashboard';
import { fetchUserRequestServer } from 'store/actions/user';

export default [
  {
    path: '/',
    component: LandingPage,
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

