import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import routes from './constants/routes';
import { LocaleContext } from 'context';

const store = createStore(reducers);

class App extends Component {
  state = {
    locale: window.navigator.language === 'ko-KR' ? 'ko' : 'en',
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <LocaleContext.Provider value={this.state.locale}>
            <div className="App">
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} component={route.component} />;
              })}
            </div>
          </LocaleContext.Provider>
        </Router>
      </Provider>
    );
  }
}

export { LocaleContext };
export default App;
