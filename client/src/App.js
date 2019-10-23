import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthStatusRequest } from 'store/actions/auth';
import routes from './constants/routes';
import NotFound from './pages/notFound';
import RouteChangeWatcher from 'components/RouteChangeWatcher';
import Notifier from 'components/Notifier';

import 'App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthStatusRequest());
  }, [dispatch]);

  return (
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
  );
}

export default App;

