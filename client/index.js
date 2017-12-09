import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';

import 'materialize-css';
import 'materialize-loader';
import 'materialize-css/dist/js/materialize.min';
import { setCurrentUser } from './actions/authenticationAction';
import rootReducer from './reducers/index';
import setAuthorizationToken from './utils/setAuthorizationToken';
/*
  Import LandingPage Component
 */
import LandingPage from './components/LandingPage';
import Authentication from './components/Authentication';
/*
  import css
*/
import './styles/style.scss';

const store = createStore(
  rootReducer,
  compose(
    // Allows us dispatch asynchronous actions
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (localStorage.jwtToken) {
  // Adding the function setAuthorizationToken() call to index file
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/auth/:signup?" component={Authentication} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(router, document.getElementById('root'));
