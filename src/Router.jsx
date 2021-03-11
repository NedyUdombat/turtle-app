import React from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
import App from './pages/Index';
import NotFound from './pages/Errors/404';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Router;
