import { combineReducers } from 'redux';
import repos from './repos'
import user from './user'
import commits from './commits'
import auth from './auth'
import noti from './noti'

export default combineReducers({
  repos,
  user,
  commits,
  auth,
  noti,
});

