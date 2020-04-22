import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions'
import { clearMessages } from '../../actions/messageActions'

import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
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
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity='error'>{this.state.msg}</Alert> : null}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Vorname'
              name='firstname'
              value={this.state.firstname}
              onChange={this.onChange}
              fullWidth={true}
            />
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Nachname'
              name='lastname'
              value={this.state.lastname}
              onChange={this.onChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Stadt'
              name='city'
              value={this.state.city}
              onChange={this.onChange}
              fullWidth={true}
            />
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Postleitzahl'
              name='postalcode'
              value={this.state.postalcode}
              onChange={this.onChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              label="Geburtsdatum"
              type="date"
              name="birthday"
              onChange={this.onChange}
              value={moment(this.state.birthday).format('YYYY-MM-DD')}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='email'
              label='Email'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              fullWidth={true}
            />
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
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
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='password'
              label='Passwort bestätigen'
              name='confirmPassword'
              value={this.state.confirmPassword}
              onChange={this.onChange}
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Registrieren
          </Button>
        </p>
        <Divider variant='fullWidth'/>
        <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px"}}>
          Du bist schon angemeldet? <Link to="/login">Anmelden</Link>
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
