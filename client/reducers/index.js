import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import ideaReducer from './ideaReducer';

const rootReducer = combineReducers({ authenticationReducer, ideaReducer });

export default rootReducer;
