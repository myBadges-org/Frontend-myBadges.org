import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


export class Contact extends Component {

  state = {
    msg: null,
    msgType: null,
    content: '',
    subject: '',
    email: this.props.user && this.props.user.email ? this.props.user.email :  ''
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onReset = () => {
    this.setState({ msg: null, msgType: null, content: '', subject: '', email: this.props.user && this.props.user.email ? this.props.user.email :  '' });
  };

  onSubmit = e => {
    e.preventDefault();
    const { content, subject, email } = this.state;
    if(content && subject && email){
      const body = {
        content,
        subject,
        email
      };
      // Request Body
      axios.post('api/v1/user/contact', body)
        .then(res => {
          this.setState({
            msgType: 'success',
            msg: 'Email wurde erfolgreich versendet.',
            content: '',
            subject: '',
            email: this.props.user && this.props.user.email ? this.props.user.email :  ''
          });
        })
        .catch(err => {
          this.setState({msgType: 'error', msg: err.response.data.message});
        });
    } else {
      this.setState({msgType: 'error', msg: 'Fülle alle Felder aus.'})
    }
  };


  render(){
    const {user} = this.props;
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <TextField
          style={{marginBottom: '10px'}}
          variant='outlined'
          type='email'
          label='Email'
          name='email'
          inputProps={{pattern: "^[0-9]{5}$"}}
          disabled={user? true : false}
          onChange={user ? null : this.onChange}
          value={this.state.email}
        />
        <br></br>
        <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
          <InputLabel id="select-subject">Betreff</InputLabel>
          <Select
            labelId="select-subject"
            label="Betreff"
            name='subject'
            value={this.state.subject}
            onChange={this.onChange}

          >
            <MenuItem value='Test'>Test</MenuItem>
            <MenuItem value='Test1'>Test1</MenuItem>
            <MenuItem value='Test2'>Test2</MenuItem>
            <MenuItem value='Sonstiges'>Sonstiges</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{marginBottom: '10px'}}
          variant='outlined'
          type='text'
          label='Nachricht'
          name='content'
          value={this.state.content}
          onChange={this.onChange}
          fullWidth={true}
          multiline
        />
        <Button color="primary" variant='contained' onClick={this.onSubmit} style={{marginRight: '10px'}}>
          Senden
        </Button>
        <Button color="default" variant='contained' onClick={this.onReset}>
          Abbrechen
        </Button>
      </div>
    );
  }
}

Contact.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Contact);
