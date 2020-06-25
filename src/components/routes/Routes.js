import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import IsLoggedRoute from './IsLoggedRoute';

import Home from '../home/Home';
import Registration from '../auth/Registration';
import Login from '../auth/Login';
import User from '../auth/User';
import Password from '../auth/Password';
import ResetPassword from '../auth/ResetPassword';
import EmailConfirmation from '../auth/EmailConfirmation';
import Project from '../project/Project';
import ProjectList from '../project/ProjectList';
import CreateProject from '../project/CreateProject';
import BadgesMe from '../badge/BadgesMe';
import BadgesAll from '../badge/BadgesAll';
import Contact from '../contact/Contact';
import Imprint from '../imprint/Imprint';
import AboutUs from '../aboutUs/AboutUs';
import Faq from '../faq/Faq';
import NotFound from '../notFound/NotFound';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <IsLoggedRoute path="/login" exact>
          <Login/>
        </IsLoggedRoute>
        <IsLoggedRoute path="/register" exact>
          <Registration/>
        </IsLoggedRoute>
        <PrivateRoute path="/user" exact>
          <User/>
        </PrivateRoute>
        <Route path="/user/password" exact component={Password} />
        <Route path="/user/password/reset" exact component={ResetPassword} />
        <Route path="/user/email" exact component={EmailConfirmation} />
        <Route path="/project" exact>
          <ProjectList url='/api/v1/project'/>
        </Route>
        <PrivateRoute path="/project/me" exact>
          <ProjectList url='/api/v1/project/me'/>
        </PrivateRoute>
        <PrivateRoute path="/project/me/creator" exact>
          <ProjectList url='/api/v1/project/creator/me'/>
        </PrivateRoute>
        <PrivateRoute path="/project/create" exact>
          <CreateProject/>
        </PrivateRoute>
        <Route path="/project/:projectId" exact component={Project}/>
        <Route path="/badges" exact component={BadgesAll}/>
        <PrivateRoute path="/badges/me" exact>
          <BadgesMe/>
        </PrivateRoute>
        <Route path="/contact" exact component={Contact} />
        <Route path="/imprint" exact component={Imprint} />
        <Route path="/aboutus" exact component={AboutUs} />
        <Route path="/faq" exact component={Faq} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
