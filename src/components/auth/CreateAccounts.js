import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

export class CreateAccounts extends Component {

  state = {
    msg: null,
    msgType: '',
    count: 1
  }

  generateAccounts = () => {
    const config = {
      success: res => {
        this.setState({msgType: 'success', msg: 'Es wurden erfolgreich Accounts erstellt. Die Zugangsdaten und weitere Informationen erhalten Sie via E-Mail.'});
        window.scrollTo(0, 0);
      },
      error: err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
        window.scrollTo(0, 0);
      }
    };
    axios.post(`/api/v1/teacher/users`, {count: this.state.count}, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        if(err.response.status !== 401){
          err.config.error(err);
        }
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render(){
    return(
      <div style={{marginBottom: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <TextField
          style={{marginBottom: '10px'}}
          variant='outlined'
          type='number'
          min={1}
          label='Anzahl zu erstellender Accounts'
          name='count'
          value={this.state.count}
          onChange={this.onChange}
          fullWidth={true}
        />
        <Button color="primary" variant='contained' onClick={() => this.generateAccounts()} style={{width: '100%'}}>
          Accounts generieren
        </Button>
      </div>
    );
  }
}

CreateAccounts.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, null)(CreateAccounts);
