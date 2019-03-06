import { FETCH_USER_SUCCESS } from 'store/actions/user';

const initialState = {
  id: 0,
  name: '',
  email: '',
  token: '',
  avatarUrl: '',
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
      };
    default:
      return state;
  }
};

export default userReducer;

