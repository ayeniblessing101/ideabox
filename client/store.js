import { createStore, compose } from 'redux';
import user from './initialState/user';

// import root reducer
import rootReducer from './reducers/index';

/*
  Store
  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - similar to React's getInitialState
*/

const initialState = {
  user,
};

const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f, );
const store = createStore(rootReducer, initialState, enhancers);

export default store;
