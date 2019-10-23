export const FETCH_AUTH_STATUS_SUCCESS = 'FETCH_AUTH_STATUS_SUCCESS';
export const FETCH_AUTH_STATUS_REQUEST = 'FETCH_AUTH_STATUS_REQUEST';
export const FETCH_AUTH_STATUS_FAIL = 'FETCH_AUTH_STATUS_FAIL';

export const fetchAuthStatusSuccess = (authStatus) => ({
  type: FETCH_AUTH_STATUS_SUCCESS,
  payload: {
    authStatus,
  },
});

export const fetchAuthStatusRequest = () => ({
  type: FETCH_AUTH_STATUS_REQUEST,
});

export const fetchAuthStatusFail = () => ({
  type: FETCH_AUTH_STATUS_FAIL,
});

