import React, { Component } from 'react';

import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';


export class BadgeAssignment extends Component {

  state = {
    open: false,
    userName: '',
    userId: null,
    users: [],
    msg: null,
    msgType: null
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
  }

  toggle = () => {
    this.setState({ open: false, users: [], userName: '', userId: null, msg: null, msgType: null });
  };

  onChange = e => {
    this.setState({ userName: e.target.value });
  };

  onChangeUser = e => {
    if(e.target.value && this.state.userId === null){
      axios.get('/api/v1/user', {params: {lastname: e.target.value, limit: 3}})
        .then(res => {
          if(res.data.users.length > 0){
            this.setState({users: res.data.users});
          } else {
            this.setState({users: ['Keine Übereinstimmung gefunden.']});
          }
        })
        .catch(err => {
          this.setState({msgType: 'error', msg: err.response.data.message});
        });
    }
    else {
      this.setState({users: []});
    }
  };

  deleteUser = () => {
    this.setState({ users: [], userName: '', userId: null, msg: null, msgType: null });
  };

  setUser = (user) => {
    this.setState({ users: [], userName: `${user.lastname}, ${user.firstname}`, userId: user._id });
  };

  assigneBadge = () => {
    const config = {
      success: res => {
        console.log(res);
        this.setState({msg: res.data.message, msgType: 'success'});
      },
      error: err => {
        if(err.response.data.message === 'Local Badge is already assigned to user.' || err.response.data.message === 'Global Badge is already assigned to user.'){
          this.setState({msgType: 'info', msg: err.response.data.message});
        }
        else {
          this.setState({msgType: 'error', msg: err.response.data.message});
        }
      }
    };
    axios.put(`/api/v1/badge/${this.props.badge._id}/assigne/user/${this.state.userId}`, {}, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        if(err.response.status !== 401){
          err.config.error(err);
        }
      });
  }

  unassigneBadge = () => {
    const config = {
      success: res => {
        this.setState({msg: res.data.message, msgType: 'success'});
      },
      error: err => {
        if(err.response.data.message === 'Local Badge is already unassigned to user.' || err.response.data.message === 'Global Badge is already unassigned to user.'){
          this.setState({msgType: 'info', msg: err.response.data.message});
        }
        else {
          this.setState({msgType: 'error', msg: err.response.data.message});
        }
      }
    };
    axios.put(`/api/v1/badge/${this.props.badge._id}/unassigne/user/${this.state.userId}`, {}, config)
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
    const { badge } = this.props;
    return(
      badge ?
        <Dialog
          open={this.state.open}
          maxWidth='sm'
          fullWidth
          onClose={this.toggle}
        >
          <DialogTitle>{badge.name} vergeben</DialogTitle>
          <DialogContent>
            {this.state.msg ? <Alert style={{marginBottom: '20px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
            <TextField
              variant='outlined'
              type='text'
              label='Nachnamen vom Nutzer'
              value={this.state.userName}
              onChange={this.onChange}
              onBlur={this.onChangeUser}
              fullWidth={true}
              InputProps={{
                endAdornment:
                  <InputAdornment
                    position="end"
                  >
                    <IconButton
                      onClick={this.deleteUser}
                      edge="end"
                    >
                      <FontAwesomeIcon size='xs' icon={faTimes} />
                    </IconButton>
                  </InputAdornment>
              }}
            />
            <List style={{paddingTop: 0, paddingBottom: '10px'}}>
            {this.state.users.map((user, i) => (
              user === 'Keine Übereinstimmung gefunden.' ?
                <ListItem button key={i} onClick={this.deleteUser} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                  <ListItemText>{user}</ListItemText>
                </ListItem>
              :
              <ListItem button key={i} onClick={() => {this.setUser(user)}} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                <ListItemText>{`${user.lastname}, ${user.firstname}`}</ListItemText>
              </ListItem>
            ))}
            </List>
            <Button color="primary" disabled={this.state.userId === null} variant='contained' onClick={() => this.assigneBadge()} style={{marginRight: '10px'}}>
              Badge vergeben
            </Button>
            <Button color="primary" disabled={this.state.userId === null} variant='contained' onClick={() => this.unassigneBadge()}>
              Badge entziehen
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

export default BadgeAssignment;
