import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { watchReposFetch } from './repos';
import { watchUserFetch } from './user';
import { watchCommitsFetch } from './commits';

export function* rootSaga() {
  yield all([
    watchReposFetch(),
    watchUserFetch(),
    watchCommitsFetch(),
  ]);
};

export default createSagaMiddleware();

