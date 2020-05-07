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
import Course from '../course/Course';
import CourseList from '../course/CourseList';
import CreateCourse from '../course/CreateCourse';
import BadgesMe from '../badge/BadgesMe';
import BadgesAll from '../badge/BadgesAll';
import Contact from '../contact/Contact';
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
        <Route path="/course" exact>
          <CourseList url='/api/v1/course'/>
        </Route>
        <PrivateRoute path="/course/me" exact>
          <CourseList url='/api/v1/course/me'/>
        </PrivateRoute>
        <PrivateRoute path="/course/me/creator" exact>
          <CourseList url='/api/v1/course/creator/me'/>
        </PrivateRoute>
        <PrivateRoute path="/course/create" exact>
          <CreateCourse/>
        </PrivateRoute>
        <Route path="/course/:courseId" exact component={Course}/>
        <Route path="/badges" exact component={BadgesAll}/>
        <PrivateRoute path="/badges/me" exact>
          <BadgesMe/>
        </PrivateRoute>
        <Route path="/contact" exact component={Contact} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
