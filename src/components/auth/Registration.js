import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions'
import { clearMessages } from '../../actions/messageActions'

import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';

export class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      city: '',
      postalcode: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      msg: null,
      showPassword: false
    };
  }

  componentDidUpdate(prevProps){
    const { message } = this.props;
    if (message !== prevProps.message) {
      if(message.id === 'REGISTER_SUCCESS'){
        this.props.history.push('/login');
      }
      // Check for register error
      if(message.id === 'REGISTER_FAIL'){
        this.setState({msg: message.msg});
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
    const { firstname, lastname, city, postalcode, birthday, email, username, password, confirmPassword } = this.state;
    // create user object
    const newUser = {
      firstname,
      lastname,
      city,
      postalcode,
      birthday,
      email,
      username,
      password,
      confirmPassword
    };
    this.props.register(newUser);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  render(){
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity='error'>{this.state.msg}</Alert> : null}
        <TextField
          type='text'
          label='Vorname'
          name='firstname'
          placeholder="Vorname"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          type='text'
          label='Nachname'
          name='lastname'
          placeholder="Nachname"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          type='text'
          label='Stadt'
          name='city'
          placeholder="Stadt"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          type='text'
          label='Postleitzahl'
          name='postalcode'
          placeholder="12345"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          label="Geburtsdatum"
          type="date"
          name="birthday"
          onChange={this.onChange}
          defaultValue={moment().format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          type='email'
          label='Email'
          name='email'
          placeholder="Email"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          type='text'
          label='Nutzername'
          name='username'
          placeholder="Nutzername"
          onChange={this.onChange}
          fullWidth={true}
        />
        <TextField
          type={this.state.showPassword ? 'text' : 'password'}
          label='Passwort'
          name='password'
          placeholder="Passwort"
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
        <TextField
          type='password'
          label='Passwort bestätigen'
          name='confirmPassword'
          placeholder="Passwort bestätigen"
          onChange={this.onChange}
          fullWidth={true}
        />
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Registrieren
          </Button>
        </p>
        <Divider variant='fullWidth'/>
        <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px"}}>
          Du bist schon angemeldet? <Link to="/login" onClick={this.toggle}>Anmelden</Link>
        </p>
      </div>
    );
  }
}

Registration.propTypes = {
  isAuthenticated: PropTypes.bool,
  message: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  message: state.message
});

export default connect(mapStateToProps, { register, clearMessages })(withRouter(Registration));
