import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import Logout from '../auth/Logout';

import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';

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

const navButtonStyle = {
  padding: '6px 16px'
}

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentDidMount() {
    window.onclick = (e) => {
      if(e.target.nodeName !== "BUTTON" && e.target.nodeName !== "SPAN") {
        this.setState({open: false})
      }
    }
  }

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
          <Button component={NavLink} to={"/login"} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} strict replace color="inherit">Anmelden</Button>
          <Button component={NavLink} to={"/register"} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} exact replace color="inherit">Registrieren</Button>
        </div>
      : null;

    const mobileAuthNavbar = this.props.isAuthenticated !== null ?
      this.props.isAuthenticated ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
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
          <Button component={NavLink} to={"/login"} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} strict replace color="inherit">Anmelden</Button>
          <Button component={NavLink} to={"/register"} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} exact replace color="inherit">Registrieren</Button>
        </div>
      : null;

    const drawer = this.props.isAuthenticated !== null ?
      <div style={{flexGrow: 1}}>
        <Button component={NavLink} exact to={'/'}  style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
          <Typography variant="inherit">
            Badges&Portfolio
          </Typography>
        </Button>
        <Button component={NavLink} to={'/course'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
          Projekte
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/me'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            belegte Projekte
          </Button>
        : null}
        {this.props.isAuthenticated && this.props.user.role[0] !== 'earner' ?
          <Button component={NavLink} to={'/course/me/creator'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            erstellte Projekte
          </Button>
        : null}
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/create'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            Projekt erstellen
          </Button>
        : null}
        <Button component={NavLink} to={'/badges'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
          Badges
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/badges/me'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
            meine Badges
          </Button>
        : null}
        <Button component={NavLink} to={'/contact'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
          Kontakt
        </Button>
      </div>
    : null;

    const mobileDrawer = this.props.isAuthenticated !== null ?
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Button component={NavLink} exact to={'/'}  style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
          <Typography variant="inherit">
            Badges&Portfolio
          </Typography>
        </Button>
        <Button component={NavLink} to={'/course'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
          Projekte
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/me'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            belegte Projekte
          </Button>
        : null}
        {this.props.isAuthenticated && this.props.user.role[0] !== 'earner' ?
          <Button component={NavLink} to={'/course/me/creator'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            erstellte Projekte
          </Button>
        : null}
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/course/create'} style={navButtonStyle} activeStyle={{fontWeight: "bold"}} color="inherit">
            Projekt erstellen
          </Button>
        : null}
        <Button component={NavLink} to={'/badges'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
          Badges
        </Button>
        {this.props.isAuthenticated ?
          <Button component={NavLink} to={'/badges/me'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
            meine Badges
          </Button>
        : null}
        <Button component={NavLink} to={'/contact'} style={navButtonStyle}  activeStyle={{fontWeight: "bold"}} color="inherit">
          Kontakt
        </Button>
      </div>
    : null;

    return (
      <Fragment>
        <CssBaseline/>
          <AppBar position="relative" color='primary' style={{boxShadow: 'none', padding: '0.75rem'}}>
            <Toolbar id="back-to-top-anchor">
              {window.innerWidth < 870 &&
                <Drawer anchor='left' open={this.state.open}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={(e) => {
                      this.setState({open: !this.state.open})}
                    }
                  >
                    ≡
                  </IconButton>
                  {mobileDrawer}
                  <hr></hr>
                  {mobileAuthNavbar}
                </Drawer>
              }
              {window.innerWidth < 870 &&
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={(e) => {
                      this.setState({open: !this.state.open})}
                    }
                  >
                    ≡
                  </IconButton>
              }
              {window.innerWidth >= 870 &&
                <Container style={{display: 'flex'}}>
                  {drawer}
                  {authNavbar}
                </Container>
              }
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
