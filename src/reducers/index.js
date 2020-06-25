import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import badgeReducer from './badgeReducer';
import messageReducer from './messageReducer';
import helperReducer from './helperReducer';

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  badge: badgeReducer,
  message: messageReducer,
  helper: helperReducer
});
