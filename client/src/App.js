import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './constants/routes';
import { LocaleContext } from 'context';

class App extends Component {
  state = {
    locale: window.navigator.language === 'ko-KR' ? 'ko' : 'en',
  }

  render() {
    return (
      <Router>
        <LocaleContext.Provider value={this.state.locale}>
          <div className="App">
            {routes.map((route) => {
              return <Route key={route.path} path={route.path} component={route.component} exact />;
            })}
          </div>
        </LocaleContext.Provider>
      </Router>
    );
  }
}

export { LocaleContext };
export default App;
