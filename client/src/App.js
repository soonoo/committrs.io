import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import routes from './constants/routes';
import { LocaleContext } from 'context';
import history from './history';
import NotFound from './pages/notFound';

class App extends Component {
  state = {
    locale: window.navigator.language === 'ko-KR' ? 'ko' : 'en',
  }

  render() {
    return (
      <Router history={history}>
        <LocaleContext.Provider value={this.state.locale}>
          <div className="App">
            <Switch>
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} component={route.component} exact />;
              })}
              <Route component={NotFound} />
            </Switch>
          </div>
        </LocaleContext.Provider>
      </Router>
    );
  }
}

export { LocaleContext };
export default App;
