import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { USER_LOADED, LOGOUT_SUCCESS } from '../../actions/types';

import axios from 'axios';
import moment from 'moment';

import CreateAccounts from './CreateAccounts';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = () => ({
  error: {
    color: 'white',
    backgroundColor: 'darkred',
    '&:hover': {
      color: 'white',
      backgroundColor: 'darkred'
    }
  },
  success: {
    color: 'white',
    backgroundColor: 'darkgreen'
  }
});

export class User extends Component {

  state = {
    user: 'change',
    msg: null,
    msgType: null,
    file: null,
    url: null,
    username: this.props.user.username,
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
    email: this.props.user.email,
    city: this.props.user.city,
    postalcode: this.props.user.postalcode,
    birthday: this.props.user.birthday || '',
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    var extensionType = e.target.files[0].type.split('image/')[1];
    if(extensionType !== 'png' && extensionType !== 'jpg' && extensionType !== 'gif' && extensionType !== 'jpeg') {
      this.setState({ msgType: 'error', msg: 'Es sind nur Bilder mit der Dateiendung "PNG", "JPG", "JPEG" und "GIF" erlaubt.' });
    }
    else {
      this.setState({ msgType: null, msg: null, file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  onReset = () => {
    this.setState({ msg: null, msgType: null, file: null, url: null, firstname: this.props.user.firstname, lastname: this.props.user.lastname, email: this.props.user.email, city: this.props.user.city, postalcode: this.props.user.postalcode });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, firstname, lastname, city, postalcode, email, file, birthday } = this.state;
    var updatedUser = new FormData();
    updatedUser.set('username', username);
    updatedUser.set('firstname', firstname);
    updatedUser.set('lastname', lastname);
    updatedUser.set('city', city);
    updatedUser.set('postalcode', postalcode);
    updatedUser.set('email', email);
    updatedUser.set('birthday', moment(birthday).format('YYYY-MM-DD'));
    updatedUser.append('profile', file);
    // Request Body
    const config = {
      success: res => {
        this.props.dispatch({
          type: USER_LOADED,
          payload: res.data.user
        })
        this.setState({msgType: 'success', msg: res.data.message});
      },
      error: err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      }
    };
    if(this.state.user === 'change'){
      axios.put('/api/v1/user/me', updatedUser, config)
        .then(res => {
          res.config.success(res);
        })
        .catch(err => {
          if(err.response.status !== 401){
            err.config.error(err);
          }
        });
    } else {
      axios.post('/api/v1/user/me', updatedUser, config)
        .then(res => {
          res.config.success(res);
        })
        .catch(err => {
          if(err.response.status !== 401){
            err.config.error(err);
          }
        });
    }
  };


  onDelete = (e) => {
    e.preventDefault();
    const config = {
      success: res => {
        this.props.dispatch({
          type: LOGOUT_SUCCESS
        })
        this.setState({msgType: 'success', msg: res.data.message});
      },
      error: err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      }
    };
    axios.delete('/api/v1/user/me', config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        if(err.response.status !== 401){
          err.config.error(err);
        }
      });
  };

  render(){
    const {user} = this.props;
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        {this.props.user.role[0] === 'teacher' ? <CreateAccounts /> : null}
        {!this.props.user.email ?
          <RadioGroup row value={this.state.user} name='user' onChange={(e) => this.onChange(e)} style={{marginBottom: '10px'}}>
            <FormControlLabel style={{color: 'black'}}
              value="change"
              control={<Radio color="primary" />}
              label="Namen ändern"
              labelPlacement="end"
            />
            <FormControlLabel style={{color: 'black'}}
              value="new"
              control={<Radio color="primary" />}
              label="Informationen ergänzen"
              labelPlacement="end"
            />
          </RadioGroup>
        : null}
        <Grid container spacing={1}>
          {this.props.user.image || this.state.user === 'new' ?
            <Grid item xs={6}>
              {(user.image && user.image.path) || this.state.url ?
                <Avatar src={this.state.url || `/media/${user.image.path}`} style={{width: '200px', height: '200px'}}/>
              : <Avatar style={{width: '200px', height: '200px'}}>{user.firstname.charAt(0)}{this.state.lastname.charAt(0)}</Avatar>
              }
            </Grid>
          : null}
          {this.props.user.image || this.state.user === 'new' ?
            <Grid item xs={6}>
              <input
                style={{display: 'none'}}
                accept="image/*"
                onChange={this.onFileChange}
                name="picture"
                type="file"
                ref={fileInput => this.fileInput = fileInput}
              />
              <Button color="primary" variant='contained' onClick={() => this.fileInput.click()} style={{top: '50%', transform: 'translateY(-50%)'}}>Bild auswählen</Button>
            </Grid>
          : null}
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Vorname'
              name='firstname'
              disabled={this.props.user.email}
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
          {!this.props.user.email ?
            <Grid item xs={12} md={6}>
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
          : null}
          {this.props.user.email || this.state.user === 'new'?
            <Grid item xs={12} md={6}>
              <TextField
                style={{marginBottom: '10px'}}
                variant='outlined'
                type='text'
                label='Email'
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                fullWidth={true}
                InputProps={this.props.user.email ? {
                  endAdornment:
                    <InputAdornment
                      position="end"
                    >
                      {user.emailIsConfirmed ?
                      <Badge badgeContent='verifiziert' color='default'/>
                      : <Badge badgeContent='nicht verifiziert' color='error'/>}
                    </InputAdornment>
                } : null}
              />
              <TextField
                style={{marginBottom: '10px'}}
                variant='outlined'
                type='text'
                label='Rolle'
                name='role'
                disabled
                defaultValue={user.role}
                fullWidth={true}
              />
            </Grid>
          : null}
          {this.props.user.city || this.state.user === 'new'?
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
          : null}
          {this.props.user.birthday || this.state.user === 'new'?
            <Grid item xs={12} md={6}>
              <TextField
                style={{marginBottom: '10px'}}
                variant='outlined'
                label="Geburtsdatum"
                type="date"
                name="birthday"
                onChange={this.onChange}
                placeholder="JJJJ-MM-TT"
                disabled={this.props.user.birthday}
                value={moment(this.state.birthday).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth={true}
              />
            </Grid>
          : null}
        </Grid>
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Speichern
          </Button>
        </p>
        <p>
          <Button color="default" variant='contained' onClick={this.onReset} style={{width: '100%'}}>
            Zurücksetzen
          </Button>
        </p>
        <Divider variant='fullWidth'/>
        <p>
          <Button classes={{root: this.props.classes.error}} variant='contained' onClick={this.onDelete} style={{width: '100%'}}>
            Löschen
          </Button>
        </p>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(User));
