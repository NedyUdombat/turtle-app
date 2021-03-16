import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/Errors/404';
import App from './pages/Index';

const Router = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
