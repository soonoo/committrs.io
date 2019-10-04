import reducer from './';

describe('userReducer.js', () => {
  it('should returns initial state', () => {
    const initialState = {
      id: 0,
      email: '',
      token: '',
      avatarUrl: '',
      github_login: '',
      github_name: '',
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

