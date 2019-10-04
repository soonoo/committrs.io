import { FETCH_USER_SUCCESS, USER_INITIAL, FETCH_USER_NOT_FOUND } from 'store/actions/user';

const initialState = {
  id: USER_INITIAL,
  github_login: '',
  github_name: '',
  email: '',
  token: '',
  avatarUrl: '',
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
    case FETCH_USER_NOT_FOUND:
      return {
        ...state,
        ...action.payload.user,
      };
    default:
      return state;
  }
};

export default userReducer;

