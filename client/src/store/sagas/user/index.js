import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, fetchUserSuccess, fetchUserFail } from 'store/actions/user';
import { GET } from '../../../util';
import { SERVER_HOST } from 'constants/index';

export function* fetchUser(action) {
  try {
    const user = yield call(GET, { url: `${SERVER_HOST}/v1/users/${action.payload.userName}` });
    yield put(fetchUserSuccess(user));
  } catch(e) {
    yield put(fetchUserFail());
  }
};

export function* watchUserFetch() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
};

