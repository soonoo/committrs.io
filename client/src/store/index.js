import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import sagaMiddleware, { rootSaga } from './sagas';

const preloadedState = window.__STATE__;
delete window.__STATE__;

const saga = sagaMiddleware();

// redux-devtools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(saga),
  ),
);

saga.run(rootSaga);

