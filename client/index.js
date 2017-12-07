import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'materialize-css';
import 'materialize-loader';
import 'materialize-css/dist/js/materialize.min';
import store from './store';
/*
  Import LandingPage Component
 */
import LandingPage from './components/LandingPage';
import Authentication from './components/Authentication';
/*
  import css
*/
import './styles/style.scss';

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
