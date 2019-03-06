export const FETCH_COMMITS_SUCCESS = 'FETCH_COMMITS_SUCCESS';
export const FETCH_COMMITS_REQUEST = 'FETCH_COMMITS_REQUEST';
export const FETCH_COMMITS_FAIL = 'FETCH_COMMITS_FAIL';

export const fetchCommitsSuccess = (userId, repoId, commits) => ({
  type: FETCH_COMMITS_SUCCESS,
  payload: {
    userId,
    repoId,
    commits,
  },
});

export const fetchCommitsRequest = (userId, repoId) => ({
  type: FETCH_COMMITS_REQUEST,
  payload: {
    userId,
    repoId,
  },
});

export const fetchCommitsFail = () => ({
  type: FETCH_COMMITS_FAIL,
});

