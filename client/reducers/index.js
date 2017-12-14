import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import ideaReducer from './ideaReducer';
import userReducer from './userReducer';
import resetPasswordReducer from './resetPasswordReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  ideaReducer,
  userReducer,
  resetPasswordReducer,
});

export default rootReducer;
