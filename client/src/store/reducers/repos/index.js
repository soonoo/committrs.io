import { FETCH_REPOS_SUCCESS } from 'store/actions/repos';

const initialState = null;

const reposReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_REPOS_SUCCESS:
      return action.payload.repos;
    default:
      return state;
  }
};

export default reposReducer;

