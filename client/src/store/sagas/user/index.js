import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, FETCH_USER_REQUEST_SERVER,
  fetchUserSuccess, fetchUserNotFound,
  MODIFY_USER_REQUEST,
} from 'store/actions/user';
import { fetchReposByNameRequest, } from 'store/actions/repos';
import { fetchUserRequest } from 'store/actions/user';
import { fetchReposByName } from 'store/sagas/repos';
import axios from 'axios';
import { SERVER_HOST } from 'constants/index';
import { END } from 'redux-saga';
import { addNoti } from 'store/actions/noti';
import { fetchAuthStatusRequest } from 'store/actions/auth';
import uuid from 'uuid/v4';

export function* fetchUser(action) {
  const { userName } = action.payload;

  try {
    const { data } = yield call(() => axios.get(`${SERVER_HOST}/v1/users/${userName}`));
    yield put(fetchUserSuccess(data));
    yield put(fetchReposByNameRequest(userName));
  } catch(e) {
    console.error('fetchUser fail: ' + e);
    yield put(fetchUserNotFound(userName));
  }
};

export function* fetchUserServer(action) {
  yield all([
    call(fetchUser, fetchUserRequest(action.payload.userName)),
    call(fetchReposByName, fetchReposByNameRequest(action.payload.userName)),
  ])
  yield put(END);
};

export function* modifyUser(action) {
  try {
    const { id, data } = action.payload;

    yield call(() => axios.post(`${SERVER_HOST}/v1/users/${id}`, data, { withCredentials: true }));
    yield put(addNoti('MDN account has been saved.', null, 2000, uuid()));
    yield put(fetchAuthStatusRequest());
  } catch(e) {
    console.error('modifyUser failed: ' + e);
  }
};

export function* watchUserFetch() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
  yield takeLatest(FETCH_USER_REQUEST_SERVER, fetchUserServer);
  yield takeLatest(MODIFY_USER_REQUEST, modifyUser);
};

