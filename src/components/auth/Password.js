import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';

export class Password extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      msgType: null,
      username: '',
      seconds: 4
    };
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
        this.props.history.push('/');
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {username } = this.state;
    if(username){
      const body = {
        username
      };
      axios.post('/api/v1/user/password/request', body)
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
      this.setState({msgType: 'error', msg: 'Bitte den Nutzernamen angeben'});
    }

  };

  render(){
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        {this.state.msgType === 'success' ?
          <div>Automatische Weiterleitung zur Homepage in {this.state.seconds} Sekunde{this.state.seconds !== 1 ? 'n' : ''} ...</div>
        : <div>
            <TextField
              variant='outlined'
              type='text'
              label='Nutzername'
              name='username'
              value={this.state.username}
              onChange={this.onChange}
              fullWidth={true}
            />
            <p>
              <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
                Passwort anfragen
              </Button>
            </p>
            <Divider variant='fullWidth'/>
            <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px"}}>
              Du weißt das Passwort doch? <Link to="/login">Anmelden</Link>
            </p>
          </div>
        }
      </div>
    );
  }
}


export default withRouter(Password);
