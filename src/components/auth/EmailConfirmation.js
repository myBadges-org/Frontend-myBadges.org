import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';

export class EmailConfirmation extends Component {

  state = {
    msg: null,
    msgType: null,
    seconds: 4
  }

  componentDidMount() {
    const token = new URLSearchParams(this.props.location.search).get('token');
    axios.post(`/api/v1/user/email/${token}`)
      .then(res => {
        this.setState({
          msgType: 'success',
          msg: 'Email wurde erfolgreich verifiziert.'
        });
        this.countdown();
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
        this.countdown();
      });
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


  render(){
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ?
          <div>
            <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert>
            Automatische Weiterleitung zur Homepage in {this.state.seconds} Sekunde{this.state.seconds !== 1 ? 'n' : ''} ...
          </div>
          : null
        }
      </div>
    );
  }
}

export default withRouter(EmailConfirmation);
