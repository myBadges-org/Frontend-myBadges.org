import { combineReducers } from 'redux';
import authReducer from './authReducer';
import badgeReducer from './badgeReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  badge: badgeReducer,
  message: messageReducer
});
