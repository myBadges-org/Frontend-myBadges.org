import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { USER_LOADED, LOGOUT_SUCCESS } from '../../actions/types';

import axios from 'axios';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

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
    msg: null,
    msgType: null,
    file: null,
    url: null,
    lastname: this.props.user.lastname,
    email: this.props.user.email,
    city: this.props.user.city,
    postalcode: this.props.user.postalcode,
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    this.setState({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
  };

  onReset = () => {
    this.setState({ msg: null, msgType: null, file: null, url: null, lastname: this.props.user.lastname, email: this.props.user.email, city: this.props.user.city, postalcode: this.props.user.postalcode });
  };

  onSubmit = e => {
    e.preventDefault();
    const { lastname, city, postalcode, email, file } = this.state;
    // create user object
    const updatedUser = {
      lastname,
      city,
      postalcode,
      email,
      image: file
    };
    // Request Body
    const body = JSON.stringify(updatedUser);
    axios.put('api/v1/user/me', body)
      .then(res => {
        this.props.dispatch({
          type: USER_LOADED,
          payload: res.data.user
        })
        this.setState({msgType: 'success', msg: res.data.message});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  };

  onDelete = (e) => {
    e.preventDefault();
    axios.delete('api/v1/user/me')
      .then(res => {
        this.props.dispatch({
          type: LOGOUT_SUCCESS
        })
        this.setState({msgType: 'success', msg: res.data.message});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  };

  render(){
    const {user} = this.props;
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {user.image ?
              <Avatar src={this.state.url || user.image} style={{width: '200px', height: '200px'}}/>
            : <Avatar style={{width: '200px', height: '200px'}}>{user.firstname.charAt(0)}{this.state.lastname.charAt(0)}</Avatar>
            }
          </Grid>
          <Grid item xs={6}>
            <input
              style={{display: 'none'}}
              accept="image/*"
              onChange={this.onFileChange}
              name="picture"
              type="file"
              ref={fileInput => this.fileInput = fileInput}
            />
            <Button color="primary" variant='contained' onClick={() => this.fileInput.click()}>Bild auswählen</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Vorname'
              name='firstname'
              disabled
              defaultValue={user.firstname}
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
              label='Email'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              fullWidth={true}
              InputProps={{
                endAdornment:
                  <InputAdornment
                    position="end"
                  >
                    {user.emailIsConfirmed ?
                    <Badge badgeContent='verifiziert' color='default'/>
                    : <Badge badgeContent='nicht verifiziert' color='error'/>}
                  </InputAdornment>
              }}
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
              disabled
              defaultValue={moment(user.birthday).format('YYYY-MM-DD')}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth={true}
            />
          </Grid>
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
