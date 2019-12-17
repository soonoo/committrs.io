import reducer, { initialState } from './';
import { fetchReposSuccess } from '../../actions/repos';

describe('reposReducer.js', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return new repositories list', () => {
    const repos = ['repo1', 'repo2', 'repo3'];
    expect(reducer(undefined, fetchReposSuccess(repos))).toEqual(repos);
  });
});

