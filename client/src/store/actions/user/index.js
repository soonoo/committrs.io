export const USER_INITIAL = 0;
export const USER_NOT_FOUND = -1;

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_REQUEST_SERVER = 'FETCH_USER_REQUEST_SERVER';
export const FETCH_USER_NOT_FOUND = 'FETCH_USER_NOT_FOUND';

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

export const fetchUserRequestServer = (userName) => ({
  type: FETCH_USER_REQUEST_SERVER,
  payload: {
    userName,
  },
});

export const fetchUserNotFound = () => ({
  type: FETCH_USER_NOT_FOUND,
  payload: {
    user: {
      id: USER_NOT_FOUND,
    },
  },
});

