import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assigneBadge } from '../../actions/courseActions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';


export class AssigneBadge extends Component {

  state = {
    open: false,
    badge: '',
    msg: null,
    msgType: null
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      // Check for assigne badge success
      if(message.id === 'ASSIGNE_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success', badge: null});
      }
      // Check for assigne badge error
      if(message.id === 'ASSIGNE_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
    }
  }

  toggle = () => {
    this.setState({ open: false, badge: '', msg: null, msgType: null });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.badge){
      this.props.assigneBadge(this.state.badge, this.props.course._id, this.props.participant._id);
    } else {
      this.setState({ msg: 'Bitte wählen Sie einen Badge aus.', msgType: 'error'});
    }
  };

  render(){
    const courseBadgesAll = this.props.course.badge;
    const userBadgesIds = this.props.participant.badge;
    const courseBadges = courseBadgesAll.filter(badge => !userBadgesIds.includes(badge._id));
    return(
      <Dialog
        open={this.state.open}
        onClose={this.toggle}
      >
        <DialogTitle>Badge vergeben</DialogTitle>
        <DialogContent>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {courseBadges.length > 0 ?
            <div>
              <Typography gutterBottom variant="subtitle1">
                {this.props.participant.firstname} {this.props.participant.lastname}
              </Typography>
              <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
                <InputLabel id="select-badge">Badge</InputLabel>
                <Select
                  labelId="select-badge"
                  label="Badge"
                  name='badge'
                  value={this.state.badge}
                  onChange={this.onChange}
                >
                  {courseBadges.map(badge => (
                    <MenuItem key={badge._id} value={badge._id}>{badge.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            : `${this.props.participant.firstname} ${this.props.participant.lastname} hat bereits alle Badges vom Projekt erhalten.`}
        </DialogContent>
        <DialogActions>
          <Button color="default" variant='contained' onClick={this.toggle}>
            Abbrechen
          </Button>
          {courseBadges.length > 0 ?
            <Button color="primary" variant='contained' onClick={this.onSubmit}>
              Bestätigen
            </Button>
          : null}
        </DialogActions>
      </Dialog>
    );
  }
}

AssigneBadge.propTypes = {
  course: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  assigneBadge: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course.course,
  message: state.message
});

export default connect(mapStateToProps, { assigneBadge })(AssigneBadge);
