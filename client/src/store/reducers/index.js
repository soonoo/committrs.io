import { combineReducers } from 'redux';
import repos from './repos'
import user from './user'
import commits from './commits'

export default combineReducers({
  repos,
  user,
  commits,
});

