import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { watchReposFetch } from './repos';
import { watchUserFetch } from './user';
import { watchCommitsFetch } from './commits';
import { watchAuthStatusFetch } from './auth';

export function* rootSaga() {
  yield all([
    watchReposFetch(),
    watchUserFetch(),
    watchCommitsFetch(),
    watchAuthStatusFetch(),
  ]);
};

export default createSagaMiddleware;

