import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../home/Home';
import Registration from '../auth/Registration';
import Login from '../auth/Login';
import User from '../auth/User';
import Contact from '../contact/Contact';
import NotFound from '../notFound/NotFound';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <PrivateRoute path="/user">
          <User/>
        </PrivateRoute>
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
