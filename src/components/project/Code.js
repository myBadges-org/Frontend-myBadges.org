import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProjects } from '../../actions/projectActions';
import { returnErrors, returnSuccess } from '../../actions/messageActions';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export class Code extends Component {

  constructor(props){
    super(props);
    this.state = {
      code: '',
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { code } = this.state;
    const config = {
      success: res => {
        this.setState({code: ''});
        this.props.loadProjects(this.props.url, null, this.props.returnSuccess(res.data.message, res.status, 'PROJECTS_SUCCESS'));
      },
      error: err => {
        this.setState({code: ''});
        this.props.returnErrors(err.response.data.message, err.response.status, 'PROJECTS_ERROR');
      }
    };
    axios.put(`/api/v1/project/code/${code}`, {}, config)
      .then(res => {
        console.log('res', res);
        res.config.success(res);
      })
      .catch(err => {
        console.log('err', err);
        if(err.response.status !== 401){
          err.config.error(err);
        }
    });
  };


  render(){
    return (
      <ExpansionPanel style={{marginBottom: '20px', borderRadius: '4px'}}>
        <ExpansionPanelSummary
          expandIcon={
            <FontAwesomeIcon icon={faChevronDown} />
          }
        >
          <Typography>Code einlösen</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            style={{marginBottom: '10px', marginRight: '10px'}}
            variant='outlined'
            type='text'
            label='Code'
            name='code'
            value={this.state.code}
            onChange={this.onChange}
            fullWidth
          />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button variant='contained' onClick={() => this.setState({code: ''})}>Zurücksetzen</Button>
          <Button disabled={this.state.code === ''} variant='contained' color='primary' onClick={this.onSubmit}>Senden</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Code.propTypes = {
  returnErrors: PropTypes.func.isRequired,
  returnSuccess: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired
};

export default connect(null, { returnErrors, returnSuccess, loadProjects })(Code);
