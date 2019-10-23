import { FETCH_AUTH_STATUS_SUCCESS } from 'store/actions/auth';

export const AUTH_STATUS = {
  UNKNOWN: Symbol(),
  LOGGED_IN: Symbol(),
  NOT_LOGGED_IN: Symbol(),
};
const initialState = {
  authorized: AUTH_STATUS.UNKNOWN,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_AUTH_STATUS_SUCCESS:
      const authorized = action.payload.authStatus.authorized ?
        AUTH_STATUS.LOGGED_IN : AUTH_STATUS.NOT_LOGGED_IN;

      return {
        ...state,
        ...action.payload.authStatus,
        authorized,
      };
    default:
      return state;
  }
};

export default authReducer;

