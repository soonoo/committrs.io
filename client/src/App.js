import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import routes from './constants/routes';
import history from './history';
import NotFound from './pages/notFound';

import 'App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className='app'>
          <Switch>
            {routes.map((route) => {
              return <Route key={route.path} path={route.path} component={route.component} exact />;
            })}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
