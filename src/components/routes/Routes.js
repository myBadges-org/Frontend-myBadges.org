import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../home/Home';
import Registration from '../auth/Registration';
import Login from '../auth/Login';
import User from '../auth/User';
import Password from '../auth/Password';
import ResetPassword from '../auth/ResetPassword';
import EmailConfirmation from '../auth/EmailConfirmation';
import Course from '../course/Course';
import CourseList from '../course/CourseList';
import CourseListMe from '../course/CourseListMe';
import CourseListMeCreator from '../course/CourseListMeCreator';
import CreateCourse from '../course/CreateCourse';
import Contact from '../contact/Contact';
import NotFound from '../notFound/NotFound';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Registration} />
        <PrivateRoute path="/user" exact>
          <User/>
        </PrivateRoute>
        <Route path="/user/password" exact component={Password} />
        <Route path="/user/password/reset" exact component={ResetPassword} />
        <Route path="/user/email" exact component={EmailConfirmation} />
        <Route path="/course" exact component={CourseList}/>
        <Route path="/course/:courseId" exact component={Course}/>
        <PrivateRoute path="/course/me" exact>
          <CourseListMe/>
        </PrivateRoute>
        <PrivateRoute path="/course/me/creator" exact>
          <CourseListMeCreator/>
        </PrivateRoute>
        <PrivateRoute path="/course/create" exact>
          <CreateCourse/>
        </PrivateRoute>
        <Route path="/course/:courseId" exact component={Course}/>
        <Route path="/contact" exact component={Contact} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
