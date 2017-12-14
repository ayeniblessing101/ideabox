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
import 'font-awesome-loader';
import { setCurrentUser } from './actions/authenticationAction';
import rootReducer from './reducers/index';
import setAuthorizationToken from './utils/setAuthorizationToken';
import AuthContainer from '../client/components/AuthContainer';
import isAuthenticated from './utils/isAuthenticated';
/*
  Import LandingPage Component
 */
import LandingPage from './components/LandingPage';
import Authentication from './components/Authentication';
import Dashboard from './components/Dashboard';
import CreateIdea from './components/CreateIdea';
import MyIdeas from './components/MyIdeas';
import AccountSetting from './components/AccountSetting';
import EditIdea from './components/EditIdea';
import ResetPassword from './components/ResetPassword';
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
        <Route exact path="/" component={isAuthenticated(LandingPage)} />
        <Route
          path="/auth/:signup?"
          component={isAuthenticated(Authentication)}
        />
        <Route exact path="/reset-password" component={ResetPassword} />
        <AuthContainer exact path="/dashboard" Comp={Dashboard} />
        <AuthContainer exact path="/create-idea" Comp={CreateIdea} />
        <AuthContainer exact path="/my-ideas" Comp={MyIdeas} />
        <AuthContainer exact path="/settings" Comp={AccountSetting} />
        <AuthContainer exact path="/my-idea/:id" Comp={EditIdea} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(router, document.getElementById('root'));
