import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@material-ui/core/InputAdornment';

export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      msgType: null,
      resetPasswordToken: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      seconds: 4
    };
  }

  componentDidMount(){
    const token = new URLSearchParams(this.props.location.search).get('token');
    if(token){
      this.setState({ resetPasswordToken: token });
    } else {
      this.setState({ msgType: 'error', msg: 'Kein Token übergeben.'})
    }
  }

  componentWillUnmount(){
    clearInterval(this.myInterval);
  }

  countdown = () => {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
          this.setState({ seconds: seconds-1});
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
        this.props.history.push('/login');
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { password, confirmPassword, resetPasswordToken } = this.state;
    if(password && confirmPassword){
      if(password === confirmPassword){
        const body = {
          resetPasswordToken,
          password,
          confirmPassword
        };
        axios.post('/api/v1/user/password/reset', body)
          .then(res => {
            this.setState({
              msgType: 'success',
              msg: res.data.message
            });
            this.countdown();
          })
          .catch(err => {
            this.setState({msgType: 'error', msg: err.response.data.message});
          });
      } else {
        this.setState({msgType: 'error', msg: 'Passwörter müssen übereinstimmen'});
      }
    } else {
      this.setState({msgType: 'error', msg: 'Bitte Passwort angeben.'});
    }
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
        {this.state.msg ? <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        {this.state.resetPasswordToken ?
          this.state.msgType === 'success' ?
            <div>Automatische Weiterleitung zum Login in {this.state.seconds} Sekunde{this.state.seconds !== 1 ? 'n' : ''} ...</div>
          : <div>
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
                variant='outlined'
                type='password'
                label='Passwort bestätigen'
                name='confirmPassword'
                value={this.state.confirmPassword}
                onChange={this.onChange}
                fullWidth={true}
              />
              <p>
                <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
                  Passwort ändern
                </Button>
              </p>
            </div>
         : null
        }
      </div>
    );
  }
}


export default withRouter(ResetPassword);
