import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';


class PrivateRoute extends Component {

  render() {
    return (
      <Route
        {...this.props.exact}
        render={({ location }) =>
          this.props.isAuthenticated ? (
            this.props.children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
