import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import ideaReducer from './ideaReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  ideaReducer,
  userReducer,
});

export default rootReducer;
