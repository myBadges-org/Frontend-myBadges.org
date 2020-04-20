import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions'

import Button from '@material-ui/core/Button';


export class Logout extends Component {

  componentDidMount() {
    window.addEventListener('storage', e => {
      if(e.key === 'token' && e.oldValue && !e.newValue) {
        this.props.logout();
      }
    });
  }


  render(){
    return(
      <Button color="inherit" onClick={this.props.logout}>Logout</Button>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
