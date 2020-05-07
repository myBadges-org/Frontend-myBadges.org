import React, { Component } from 'react';

import axios from 'axios';

import Badges from './Badges';

import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

export class BadgesAll extends Component {

  state = {
    badges: null,
    isLoading: false,
    msg: null,
    msgType: null
  }

  componentDidMount(){
    axios.get('/api/v1/badge')
      .then(res => {
        this.setState({ badges: res.data.badges, isLoading: false});
      })
      .catch(err => {
        if(err.response){
          this.setState({msgType: 'error', msg: err.response.data.message, isLoading: false});
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


export default BadgesAll;
