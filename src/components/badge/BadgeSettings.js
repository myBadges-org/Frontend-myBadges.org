import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { acceptIssuerRequest, declineIssuerRequest, nominateIssuer } from '../../actions/badgeActions';

import CreateBadge from '../badge/CreateBadge';

import { withStyles } from '@material-ui/core/styles';

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
import { faCheck, faTimes, faTrashAlt, faRocket } from "@fortawesome/free-solid-svg-icons";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

const styles = () => ({
  error: {
    color: 'white',
    backgroundColor: 'darkred',
    '&:hover': {
      color: 'white',
      backgroundColor: 'darkred'
    }
  }
});

export class BadgeSettings extends Component {

  state = {
    open: false,
    openBadgeCreator: false,
    user: ''
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    if(previousState.openBadgeCreator === true){
      this.setState({ openBadgeCreator: false });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      // Check for success
      if(message.id === 'ACCEPT_MENTOR_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'});
      }
      if(message.id === 'CHANGE_BADGE_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'});
        // const badgeIndex = this.props.badges.indexOf(this.props.badge._id);
        // this.props.badge = this.props.badges[badgeIndex];
      }
      if(message.id === 'DECLINE_MENTOR_SUCCESS'){
        this.setState({user: ''});
      }
      if(message.id === 'NOMINATE_ISSUER_SUCCESS'){
        this.setState({user: ''});
      }
      // Check for error
      if(message.id === 'ACCEPT_MENTOR_ERROR'){
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
            {badge.requestor.length > 0 ?
              <div>
                <p>
                  <b>offene Anfragen</b>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {badge.requestor.map(user => (
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
            {badge.mentor.length > 0 && this.props.user && this.props.user._id ?
              <p>
                <b>bestehende Mentoren verwalten</b>
                <FormControl style={{marginBottom: '10px', width: 'calc(100% - 42px - 42px)'}}>
                  {this.state.user === '' ?
                    <InputLabel
                      htmlFor='select-user'
                      shrink={false}
                      disabled
                      style={{transform: 'translate(0, 8px) scale(1)'}}
                    >
                      Nutzer auswählen
                    </InputLabel>
                  : null}
                  <Select
                    labelId='select-user'
                    style={{marginTop: 0}}
                    name='user'
                    value={this.state.user}
                    onChange={this.onChange}
                  >
                    {badge.mentor.filter(user => user._id !== this.props.user._id).map(mentor => (
                      <MenuItem key={mentor._id} value={mentor._id}>{mentor.lastname}, {mentor.firstname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title="zum Issuer befördern">
                  <IconButton style={{width: '42px', paddingTop: '10px'}} disabled={!this.state.user} onClick={() => this.props.nominateIssuer(badge._id, this.state.user)}>
                    <FontAwesomeIcon size='xs' icon={faRocket}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Erlaubnis entziehen">
                  <IconButton style={{width: '42px', paddingTop: '10px'}} disabled={!this.state.user} onClick={() => this.props.declineIssuerRequest(badge._id, this.state.user)}>
                    <FontAwesomeIcon size='xs' icon={faTrashAlt}/>
                  </IconButton>
                </Tooltip>
              </p>
            : <p><b>keine bestehenden Mentoren</b></p>}
            <Button color="primary" variant='contained' onClick={() => this.setState({openBadgeCreator: true})} style={{width: '100%'}}>
              Bearbeiten
              <CreateBadge open={this.state.openBadgeCreator} badge={this.props.badge}/>
            </Button>
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
  badge: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  acceptIssuerRequest: PropTypes.func.isRequired,
  declineIssuerRequest: PropTypes.func.isRequired,
  nominateIssuer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  badge: state.badge.badge,
  message: state.message
});

export default connect(mapStateToProps, { acceptIssuerRequest, declineIssuerRequest, nominateIssuer })(withStyles(styles)(BadgeSettings));
