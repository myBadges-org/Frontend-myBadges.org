import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import Logout from '../auth/Logout';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class Navbar extends Component {

  render(){

    const authNavbar = (this.props.isAuthenticated ? (
      <div style={{display: 'flex'}}>
        <Logout/>
        <Button component={NavLink} to={"/user"} strict replace color="inherit">User</Button>
      </div>
    ) : (
      <div>
        <Button component={NavLink} to={"/login"} strict replace color="inherit">Anmelden</Button>
        <Button component={NavLink} to={"/register"} exact replace color="inherit">Registrieren</Button>
      </div>
    ));

    const drawer = (
      <div style={{flexGrow: 1}}>
        <Button component={NavLink} exact to={'/'} activeStyle={{fontWeight: "bold"}} color="inherit">
          <Typography variant="inherit">
            OpenBadges
          </Typography>
        </Button>
        <Button component={NavLink} to={'/course'} activeStyle={{fontWeight: "bold"}} color="inherit">
          Kursliste
        </Button>
        <Button component={NavLink} to={'/contact'} activeStyle={{fontWeight: "bold"}} color="inherit">
          Kontakt
        </Button>
      </div>
    );

    return (
      <Fragment>
        <CssBaseline/>
          <AppBar position="relative" color='primary'>
            <Toolbar id="back-to-top-anchor">
              {drawer}
              {authNavbar}
            </Toolbar>
          </AppBar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Navbar);
