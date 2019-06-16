import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_REPOS_REQUEST, fetchReposFail, fetchReposSuccess } from 'store/actions/repos';
import { GET } from '../../../util';
import { SERVER_HOST } from 'constants/index';

export function* fetchRepos(action) {
  const url = `${SERVER_HOST}/v1/repos/${action.payload.userId}`;
  try {
    const repos = yield call(GET, { url });
    yield put(fetchReposSuccess(repos));
  } catch(e) {
    yield put(fetchReposFail());
  }
};

export function* watchReposFetch() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchRepos);
};

