import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import Logout from '../auth/Logout';

import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  avatar: {
    color: theme.palette.primary.main,
    backgroundColor: 'white'
  }
});

class Navbar extends Component {

  render(){

    const authNavbar = this.props.isAuthenticated !== null ?
      this.props.isAuthenticated ?
        <div style={{display: 'flex'}}>
          <Logout/>
          <Button component={NavLink} to={"/user"} strict replace color="inherit">
            {this.props.user.image && this.props.user.image.path ?
              <Avatar src={`/media/${this.props.user.image.path}`}/>
            : <Avatar classes={{root: this.props.classes.avatar}}>{this.props.user.firstname.charAt(0)}{this.props.user.lastname.charAt(0)}</Avatar>
            }
          </Button>
        </div>
       :
        <div>
          <Button component={NavLink} to={"/login"} activeStyle={{fontWeight: "bold"}} strict replace color="inherit">Anmelden</Button>
          <Button component={NavLink} to={"/register"} activeStyle={{fontWeight: "bold"}} exact replace color="inherit">Registrieren</Button>
        </div>
      : null;

    const drawer = this.props.isAuthenticated !== null ?
      <div style={{flexGrow: 1}}>
        <Button component={NavLink} exact to={'/'} activeStyle={{fontWeight: "bold"}} color="inherit">
          <Typography variant="inherit">
            OpenBadges
          </Typography>
        </Button>
        <Button component={NavLink} to={'/course'} activeStyle={{fontWeight: "bold"}} color="inherit">
          Kursliste
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/me'} activeStyle={{fontWeight: "bold"}} color="inherit">
            belegte Kurse
          </Button>
        : null}
        {this.props.isAuthenticated && this.props.user.role[0] !== 'earner' ?
          <Button component={NavLink} to={'/course/me/creator'} activeStyle={{fontWeight: "bold"}} color="inherit">
            erstellte Kurse
          </Button>
        : null}
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/create'} activeStyle={{fontWeight: "bold"}} color="inherit">
            Kurs erstellen
          </Button>
        : null}
        <Button component={NavLink} to={'/badges'} activeStyle={{fontWeight: "bold"}} color="inherit">
          Badges
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/badges/me'} activeStyle={{fontWeight: "bold"}} color="inherit">
            meine Badges
          </Button>
        : null}
        <Button component={NavLink} to={'/contact'} activeStyle={{fontWeight: "bold"}} color="inherit">
          Kontakt
        </Button>
      </div>
    : null;

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
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(withStyles(styles, {withTheme: true})(Navbar));
