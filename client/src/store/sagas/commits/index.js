import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_COMMITS_REQUEST, fetchCommitsFail, fetchCommitsSuccess } from 'store/actions/commits';
import { GET } from '../../../util';
import { SERVER_HOST } from 'constants/urls';

export function* fetchCommits(action) {
  const { userId, repoId } = action.payload;
  const url = `${SERVER_HOST}/v1/commits/${userId}/${repoId}`;

  try {
    const commits = yield call(GET, { url });
    yield put(fetchCommitsSuccess(userId, repoId, commits));
  } catch(e) {
    yield put(fetchCommitsFail());
  }
};

export function* watchCommitsFetch() {
  yield takeEvery(FETCH_COMMITS_REQUEST, fetchCommits);
};

