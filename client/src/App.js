import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './constants/routes';
import NotFound from './pages/notFound';

import 'App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} component={route.component} exact />;
          })}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
