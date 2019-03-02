export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';

export const fetchReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: {
    repos,
  },
});

export const fetchReposRequest = (repos) => ({
  type: FETCH_REPOS_REQUEST,
});

