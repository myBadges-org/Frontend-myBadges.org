import React, { Component } from 'react';

import axios from 'axios';

import Badges from './Badges';

import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

export class BadgesMe extends Component {

  state = {
    badges: null,
    isLoading: false,
    msg: null,
    msgType: null
  }

  componentDidMount(){
    const config = {
      success: res => {
        this.setState({ badges: res.data.badges, isLoading: false});
      },
      error: err => {
        this.setState({msgType: 'error', msg: err.response.data.message, isLoading: false});
      }
    };
    axios.get('/api/v1/badge/me')
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        if(err.response.status !== 401){
          err.config.error(err);
        }
      });
  }

  render(){
    return(
      <div>
        {this.state.isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {!this.state.isLoading && this.state.badges ?
            <Badges badges={this.state.badges}/>
          : null}
        </div>
      </div>
    );
  }
}


export default BadgesMe;
