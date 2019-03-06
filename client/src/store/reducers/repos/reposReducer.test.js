import reducer from './';

describe('reposReducer.js', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
});

