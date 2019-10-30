import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_AUTH_STATUS_REQUEST, fetchAuthStatusSuccess } from 'store/actions/auth';
import axios from 'axios';
import { SERVER_HOST } from 'constants/index';

export function* fetchAuthStatus(action) {
  try {
    const { data } = yield call(() => axios.get(`${SERVER_HOST}/v1/users/authStatus`, { withCredentials: true }));
    yield put(fetchAuthStatusSuccess(data));
  } catch(e) {
    console.error('fetcuUserAuthStatus failed: ' + e);
  }
};

export function* watchAuthStatusFetch() {
  yield takeLatest(FETCH_AUTH_STATUS_REQUEST, fetchAuthStatus);
};

