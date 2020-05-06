import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions'
import { clearMessages } from '../../actions/messageActions'

import { withRouter, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      msg: null,
      msgType: '',
      showPassword: false
    };
  }

  componentDidUpdate(prevProps){
    const { message } = this.props;
    if (message !== prevProps.message) {
      if(message.id === 'LOGIN_SUCCESS'){
        this.props.history.push('/');
      }
      // Check for login error
      if(message.id === 'LOGIN_FAIL' || message.id === 'REGISTER_FAIL'){
        this.setState({msg: message.msg, msgType: 'error'})
      }
      // Check for register success
      else if(message.id === 'REGISTER_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'})
      }
      else {
        this.setState({msg: null});
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {username, password} = this.state;
    // create user object
    const user = {
      username,
      password
    };
    this.props.login(user);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  render(){
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <TextField
          style={{marginBottom: '10px'}}
          variant='outlined'
          type='text'
          label='Nutzername'
          name='username'
          value={this.state.username}
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          variant='outlined'
          type={this.state.showPassword ? 'text' : 'password'}
          label='Passwort'
          name='password'
          value={this.state.password}
          InputProps={{
            endAdornment:
              <InputAdornment
                position="end"
              >
                <IconButton
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                >
                  <FontAwesomeIcon size='xs' icon={this.state.showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </InputAdornment>
          }}
          onChange={this.onChange}
          fullWidth={true}
        />
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Anmelden
          </Button>
        </p>
        <p style={{textAlign: 'center', fontSize: '0.8rem'}}>
          <Link to="/user/password" onClick={this.toggle}>Passwort vergessen?</Link>
        </p>
        <Divider variant='fullWidth'/>
        <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px"}}>
          Du hast noch kein Konto? <Link to="/register" onClick={this.toggle}>Registrieren</Link>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  message: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, { login, clearMessages })(withRouter(Login));
