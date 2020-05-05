import { combineReducers } from 'redux';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import badgeReducer from './badgeReducer';
import messageReducer from './messageReducer';
import helperReducer from './helperReducer';

export default combineReducers({
  auth: authReducer,
  course: courseReducer,
  badge: badgeReducer,
  message: messageReducer,
  helper: helperReducer
});
