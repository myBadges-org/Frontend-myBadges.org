import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getParticipants } from '../../actions/courseActions';

import moment from 'moment';
import localization from 'moment/locale/de';
import { withRouter } from 'react-router-dom';

import AssigneBadge from '../badge/AssigneBadge';
import UnassigneBadge from '../badge/UnassigneBadge';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export class Participants extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      msg: null,
      msgType: null,
      participants: null,
      openAssigneBadge: false,
      openUnassigneBadge: false
    };
  }

  componentDidMount(){
    this.props.getParticipants(this.props.match.params.courseId);
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    if(this.state.openAssigneBadge === true){
      this.setState({ openAssigneBadge: false });
    }
    if(this.state.openUnassigneBadge === true){
      this.setState({ openUnassigneBadge: false });
    }
    const { message, course } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'COURSE_PARTICIPANTS_SUCCESS'){
        this.setState({ participants: course.participants });
      }
    }
  }

  toggle = () => {
    this.setState({ open: false });
  };

  render(){
    const { participants } = this.state;
    moment.locale('de', localization);
    return (
      participants ?
        <Dialog
          open={this.state.open}
          maxWidth='md'
          fullWidth
          onClose={this.toggle}
        >
          <DialogTitle>Teilnehmer vom Projekt {this.props.courseName}</DialogTitle>
          <DialogContent>
            <div>
              {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
              {participants.length > 0 ?
                participants.map(user => (
                  <Paper key={user._id} style={{marginBottom: '15px'}}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {(user.image && user.image.path) ?
                          <Avatar src={`/media/${user.image.path}`} style={{width: '200px', height: '200px'}}/>
                        : <Avatar style={{width: '200px', height: '200px'}}>{user.firstname.charAt(0)}{user.lastname.charAt(0)}</Avatar>
                        }
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="body1">
                              <b>{user.lastname}, {user.firstname}</b>
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              Geburtsdatum: {moment(user.birthday).format('LL')}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              Stadt: {user.city}, PLZ: {user.postalcode}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              erhaltene Badges: <b>{user.badge.concat(user.localbadge).length}</b>
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              registriert seit {moment(user.date).format('LLLL')}
                            </Typography>
                          </Grid>
                          <Grid item xs container justify="flex-end" alignItems="flex-end">
                            <Button variant="contained" color="default" onClick={() => this.setState({ openUnassigneBadge: true, participant: user })} style={{marginRight: '10px'}}>
                              Badge entziehen
                            </Button>
                            <UnassigneBadge open={this.state.openUnassigneBadge  && this.state.participant._id === user._id} participant={user}/>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ openAssigneBadge: true, participant: user })} style={{marginRight: '-8px'}}>
                              Badge vergeben
                            </Button>
                            <AssigneBadge open={this.state.openAssigneBadge && this.state.participant._id === user._id} participant={user}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              :
                'Es sind zurzeit keine Nutzer dem Projekt zugeordnet.'}
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="default" variant='contained' onClick={this.toggle}>
              Zurück
            </Button>
          </DialogActions>
        </Dialog>
      : null
    );
  }
}

Participants.propTypes = {
  course: PropTypes.object,
  message: PropTypes.object.isRequired,
  getParticipants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  course: state.course.course
});

export default connect(mapStateToProps, { getParticipants })(withRouter(Participants));
