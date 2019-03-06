export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    user,
  },
});

export const fetchUserRequest = (userName) => ({
  type: FETCH_USER_REQUEST,
  payload: {
    userName,
  },
});

export const fetchUserFail = () => ({
  type: FETCH_USER_FAIL,
});

