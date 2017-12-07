import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'materialize-css';
import 'materialize-loader';
import 'materialize-css/dist/js/materialize.min';
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
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/auth" component={Authentication} />
    </Switch>
  </BrowserRouter>
);

render(router, document.getElementById('root'));
