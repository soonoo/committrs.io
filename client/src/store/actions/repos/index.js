export const SET_REPOS = 'SET_REPOS';

export const setRepos = (repos) => ({
  type: SET_REPOS,
  payload: {
    repos,
  },
});

