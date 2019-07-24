export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
export const FETCH_REPOS_BY_NAME_REQUEST = 'FETCH_REPOS_BY_NAME_REQUEST';
export const FETCH_REPOS_FAIL = 'FETCH_REPOS_FAIL';

export const fetchReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: {
    repos,
  },
});

export const fetchReposRequest = (userId) => ({
  type: FETCH_REPOS_REQUEST,
  payload: {
    userId,
  },
});

export const fetchReposByNameRequest = (userName) => ({
  type: FETCH_REPOS_BY_NAME_REQUEST,
  payload: {
    userName,
  },
});

export const fetchReposFail = () => ({
  type: FETCH_REPOS_FAIL,
});

