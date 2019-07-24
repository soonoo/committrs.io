import { take, takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, FETCH_USER_REQUEST_SERVER, fetchUserSuccess, fetchUserNotFound } from 'store/actions/user';
import { fetchReposByNameRequest, } from 'store/actions/repos';
import { fetchUserRequest } from 'store/actions/user';
import axios from 'axios';
import { SERVER_HOST } from 'constants/index';
import { END } from 'redux-saga';

export function* fetchUser(action) {
  try {
    const { data } = yield call(axios.get, `${SERVER_HOST}/v1/users/${action.payload.userName}`);
    yield put(fetchUserSuccess(data));
    yield put(fetchReposByNameRequest(action.payload.userName));
  } catch(e) {
    yield put(fetchUserNotFound());
  }
};

export function* fetchUserServer(action) {
  yield put(fetchUserRequest(action.payload.userName));
  yield put(fetchReposByNameRequest(action.payload.userName));
  yield put(END);

}

export function* watchUserFetch() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
  yield takeLatest(FETCH_USER_REQUEST_SERVER, fetchUserServer);
};

