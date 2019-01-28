import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} component={route.component} />;
          })}
        </div>
      </Router>
    );
  }
}

export default App;
