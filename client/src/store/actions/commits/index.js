export const FETCH_COMMITS_SUCCESS = 'FETCH_COMMITS_SUCCESS';
export const FETCH_COMMITS_REQUEST = 'FETCH_COMMITS_REQUEST';

export const fetchCommitsSuccess= (commits) => ({
  type: FETCH_COMMITS_SUCCESS,
  payload: {
    commits,
  },
});

export const fetchCommitsRequest = () => ({
  type: FETCH_COMMITS_REQUEST,
});

