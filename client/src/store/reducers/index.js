import { combineReducers } from 'redux';
import repos from './repos'
import user from './user'

export default combineReducers({
  repos,
  user,
});

