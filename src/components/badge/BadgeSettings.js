import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { acceptIssuerRequest, declineIssuerRequest } from '../../actions/badgeActions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Tooltip from '@material-ui/core/Tooltip';

export class BadgeSettings extends Component {

  state = {
    open: false,
    user: ''
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      // Check for success
      if(message.id === 'ACCEPT_ISSUER_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'});
      }
      if(message.id === 'DECLINE_ISSUER_SUCCESS'){
        this.setState({user: ''});
      }
      // Check for error
      if(message.id === 'ACCEPT_ISSUER_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
    }
  }

  toggle = () => {
    this.setState({ open: false, user: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render(){
    const { badge } = this.props;
    return(
      badge ?
        <Dialog
          open={this.state.open}
          maxWidth='sm'
          fullWidth
          onClose={this.toggle}
        >
          <DialogTitle>{badge.name}</DialogTitle>
          <DialogContent>
            {badge.request.length > 0 ?
              <div>
                <p>
                  <b>offene Anfragen</b>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {badge.request.map(user => (
                          <TableRow key={user._id}>
                            <TableCell style={{padding: '0px 0px 0px 10px'}}>
                              {user.lastname}, {user.firstname}
                            </TableCell>
                            <TableCell style={{padding: '0px', width: '42px'}}>
                              <Tooltip title="Anfrage annehmen">
                                <IconButton onClick={() => this.props.acceptIssuerRequest(badge._id, user._id)}>
                                  <FontAwesomeIcon size='xs' icon={faCheck}/>
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell style={{padding: '0px', width: '42px'}}>
                              <Tooltip title="Anfrage ablehnen">
                                <IconButton onClick={() => this.props.declineIssuerRequest(badge._id, user._id)}>
                                  <FontAwesomeIcon size='xs' icon={faTimes}/>
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </p>
              </div>
              : <p><b>keine offenen Anfragen</b></p>
            }
            {badge.issuer.length-1 > 0 && this.props.user && this.props.user._id ?
              <p>
                <b>bestehende Nutzer verwalten</b>
                <FormControl style={{marginBottom: '10px', width: 'calc(100% - 42px)'}}>
                  {this.state.user === '' ?
                    <InputLabel
                      htmlFor='select-user'
                      shrink={false}
                      disabled
                      style={{transform: 'translate(0, 8px) scale(1)'}}
                    >
                      Nutzer
                    </InputLabel>
                  : null}
                  <Select
                    labelId='select-user'
                    style={{marginTop: 0}}
                    name='user'
                    value={this.state.user}
                    onChange={this.onChange}
                  >
                    {badge.issuer.filter(user => user._id !== this.props.user._id).map(issuer => (
                      <MenuItem key={issuer._id} value={issuer._id}>{issuer.lastname}, {issuer.firstname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title="Erlaubnis entziehen">
                  <IconButton style={{width: '42px', paddingTop: '10px'}} onClick={() => this.props.declineIssuerRequest(badge._id, this.state.user)}>
                    <FontAwesomeIcon size='xs' icon={faTrashAlt}/>
                  </IconButton>
                </Tooltip>
              </p>
            : <p><b>keine bestehenden Nutzer</b></p>}
          </DialogContent>
          <DialogActions>
            <Button color="default" variant='contained' onClick={this.toggle}>
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      : null
    );
  }
}

BadgeSettings.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object.isRequired,
  acceptIssuerRequest: PropTypes.func.isRequired,
  declineIssuerRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  message: state.message
});

export default connect(mapStateToProps, { acceptIssuerRequest, declineIssuerRequest })(BadgeSettings);
