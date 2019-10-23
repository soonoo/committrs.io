import { FETCH_USER_SUCCESS, USER_INITIAL, FETCH_USER_NOT_FOUND } from 'store/actions/user';

const profileTemplate = {
  id: USER_INITIAL,
  github_login: '',
  github_name: '',
  email: '',
  token: '',
  avatarUrl: '',
};

const initialState = {
  profiles: [],
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_NOT_FOUND:
      return {
        ...state,
        ...action.payload.user,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        profiles: [...state.profiles, action.payload.user],
      };
    default:
      return state;
  }
};

export default userReducer;

