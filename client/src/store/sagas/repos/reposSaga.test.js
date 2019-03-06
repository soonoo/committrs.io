import { call, put } from 'redux-saga/effects';
import { fetchRepos } from './';
import { FETCH_REPOS_REQUEST, fetchReposSuccess } from 'store/actions/repos';

describe('fetchReposSaga', () => {
  const gen = fetchRepos();
  it('test', () => {
    const repos = [];
    expect(gen.next().value).toEqual(call(fetch, `http://localhost:8000/api/repos/1`));
    expect(gen.next(repos).value).toEqual(put(fetchReposSuccess(repos)));
  })
});

