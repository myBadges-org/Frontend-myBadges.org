import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assigneMultipleBadges } from '../../actions/projectActions';

import { withRouter } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

export class AssigneMultipleBadges extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      msg: null,
      msgType: null,
      participants: null,
      assigned: {}
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    const { message, project } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'PROJECT_PARTICIPANTS_SUCCESS'){
        this.setState({ participants: project.participants});
      }
      if(message.id === 'MULTIPLE_ASSIGNE_SUCCESS'){
        this.setState({ msg: message.msg, msgType: 'success', assigned: {} });
        // this.dialogContent.scrollTo(0, 0);
      }
      if(message.id === 'MULTIPLE_ASSIGNE_ERROR'){
        this.setState({ msg: message.msg, msgType: 'error', assigned: {} });
        // window.scrollTo(0, 0);
      }
    }
  }

  onChange = (e, participantId, badgeId) => {
    var assigned = this.state.assigned;
    if(e.target.checked){
      assigned[participantId] ?
        assigned[participantId].push(badgeId)
      : assigned[participantId] = [badgeId]
    } else {
      const assignedBadges = assigned[participantId].filter(bId => bId !== badgeId);
      assignedBadges.length > 0 ?
        assigned[participantId] = assignedBadges
      : delete assigned[participantId];
    }
    this.setState({ assigned: assigned });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.assigneMultipleBadges(this.props.match.params.projectId, this.state.assigned);
  };

  toggle = () => {
    this.setState({ open: false, assigned: {}, msg: null, msgType: null });
  };

  render(){
    const { participants } = this.state;
    const badges = this.props.project.badge;
    const disabled = !Object.keys(this.state.assigned).length > 0;
    return (
      participants ?
        <Dialog
          open={this.state.open}
          maxWidth='md'
          fullWidth
          onClose={this.toggle}
        >
          <DialogTitle>Badges vergeben</DialogTitle>
          <DialogContent>
            <div>
              {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
              {participants.length > 0 ?
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center" colSpan={badges.length}>Badges</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        {badges.map(badge => (
                          <TableCell align="center" key={badge._id}>{badge.name}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {participants.map(participant => (
                        <TableRow key={participant._id}>
                          <TableCell align="center">{participant.lastname}, {participant.firstname}</TableCell>
                          {this.props.project.badge.map(badge => {
                            const disabled = participant.badge.includes(badge._id);
                            return (
                              <TableCell key={badge._id} align="center">
                                <Checkbox
                                  checked={(this.state.assigned && this.state.assigned[participant._id] && this.state.assigned[participant._id].includes(badge._id)) || disabled}
                                  onChange={(e) => this.onChange(e, participant._id, badge._id)}
                                  disabled={disabled}
                                  color="primary"
                                />
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              :
                'Es sind zurzeit keine Nutzer dem Projekt zugeordnet.'}
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="default" variant='contained' onClick={this.toggle}>
              Abbrechen
            </Button>
            <Button color="primary" disabled={disabled} variant='contained' onClick={this.onSubmit}>
              Bestätigen
            </Button>
          </DialogActions>
        </Dialog>
      : null
    );
  }
}

AssigneMultipleBadges.propTypes = {
  project: PropTypes.object,
  message: PropTypes.object.isRequired,
  assigneMultipleBadges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  project: state.project.project
});

export default connect(mapStateToProps, { assigneMultipleBadges })(withRouter(AssigneMultipleBadges));
