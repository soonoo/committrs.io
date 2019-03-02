import createSagaMiddleware from 'redux-saga';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_REPOS_REQUEST, fetchReposSuccess } from 'store/actions/repos';

function* fetchRepos() {
  const repos = yield call(fetch, `http://localhost:8000/api/repos/1`);
  yield put(fetchReposSuccess(repos));
};

function* watchReposFetch() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchRepos);
};

export function* rootSaga() {
  yield all([
    watchReposFetch(),
  ]);
};

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

