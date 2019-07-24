import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { FETCH_REPOS_REQUEST, FETCH_REPOS_BY_NAME_REQUEST, fetchReposFail, fetchReposSuccess } from 'store/actions/repos';
import axios from 'axios';
import { SERVER_HOST } from 'constants/index';

export function* fetchRepos(action) {
  const url = `${SERVER_HOST}/v1/repos/${action.payload.userId}`;

  try {
    const { data } = yield call(axios.get, url);
    yield put(fetchReposSuccess(data));
  } catch(e) {
    yield put(fetchReposFail());
  }
};

export function* fetchReposByName(action) {
  const url = `${SERVER_HOST}/v1/users/${action.payload.userName}/repos`;

  try {
    const { data } = yield call(axios.get, url);
    yield put(fetchReposSuccess(data));
  } catch(e) {
    yield put(fetchReposFail());
  }
};

export function* watchReposFetch() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchRepos);
  yield takeLatest(FETCH_REPOS_BY_NAME_REQUEST, fetchReposByName);
};

