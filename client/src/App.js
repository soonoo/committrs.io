import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthStatusRequest } from 'store/actions/auth';
import routes from './constants/routes';
import NotFound from './pages/notFound';
import RouteChangeWatcher from 'components/RouteChangeWatcher';
import Notifier from 'components/Notifier';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import 'App.css';

const history = createBrowserHistory();
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthStatusRequest());
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className='app'>
        <Notifier />
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} component={route.component} exact />;
          })}
          <Route component={NotFound} />
        </Switch>
        <RouteChangeWatcher />
      </div>
    </Router>
  );
}

export default App;

