import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class User extends Component {

  render(){
    return(
      <div>
        {`angemeldet: ${this.props.isAuthenticated}`}
      </div>
    );
  }
}

User.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(User);
