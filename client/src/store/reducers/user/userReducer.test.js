import reducer from './';

describe('userReducer.js', () => {
  it('should returns initial state', () => {
    const initialState = {
      id: 0,
      name: '',
      email: '',
      token: '',
      avatarUrl: '',
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

