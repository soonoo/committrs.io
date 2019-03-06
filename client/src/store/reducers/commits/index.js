import { FETCH_COMMITS_SUCCESS } from 'store/actions/commits';

const initialState = {};

const commitsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COMMITS_SUCCESS:
      const { userId, repoId, commits } = action.payload;
      return {
        ...state,
        [`${userId}/${repoId}`]: commits,
      };
    default:
      return state;
  }
};

export default commitsReducer;

