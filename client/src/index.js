import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers';
import sagaMiddleware, { rootSaga } from './store/sagas';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const preloadedState = window.__STATE__;
delete window.__STATE__;

const saga = sagaMiddleware();

// redux-devtools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(saga),
  ),
);

saga.run(rootSaga);

const history = createBrowserHistory();
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
