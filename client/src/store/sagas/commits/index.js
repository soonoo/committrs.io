import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_COMMITS_REQUEST, fetchCommitsFail, fetchCommitsSuccess } from 'store/actions/commits';
import axios from 'axios';
import { SERVER_HOST } from 'constants/index';

export function* fetchCommits(action) {
  const { userId, repoId } = action.payload;
  const url = `${SERVER_HOST}/v1/commits/${userId}/${repoId}`;

  try {
    const { data } = yield call(axios.get, url);
    yield put(fetchCommitsSuccess(userId, repoId, data));
  } catch(e) {
    yield put(fetchCommitsFail());
  }
};

export function* watchCommitsFetch() {
  yield takeLatest(FETCH_COMMITS_REQUEST, fetchCommits);
};

