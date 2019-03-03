const initialState = {
  id: 0,
  name: '',
  email: '',
  token: '',
  avatarUrl: '',
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default userReducer;

