import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getParticipants } from '../../actions/courseActions';

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
    if(previousState.openAssigneBadge === true){
      this.setState({ openAssigneBadge: false });
    }
    if(previousState.openUnassigneBadge === true){
      this.setState({ openUnassigneBadge: false });
    }
    // if(!previousState.participants ){
    //   axios.get(`/api/v1/course/${this.props.match.params.courseId}/participants`)
    //     .then(res => {
    //       this.setState({ participants: res.data.participants });
    //     })
    //     .catch(err => {
    //       this.setState({ msg: err.response.message, msgType: 'error' });
    //     });
    // }
    const { message, course } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'COURSE_PARTICIPANTS_SUCCESS'){
        this.setState({ participants: course.participants});
      }
    }
  }

  toggle = () => {
    this.setState({ open: false });
  };

  render(){
    const { participants } = this.state;
    return (
      participants ?
        <Dialog
          open={this.state.open}
          onClose={this.toggle}
        >
          <DialogTitle>Teilnehmer vom Kurs {this.props.courseName}</DialogTitle>
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
                        : <Avatar style={{width: '200px', height: '200px'}}>{user.firstname.charAt(0)}{this.state.lastname.charAt(0)}</Avatar>
                        }
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {user.lastname}, {user.firstname}
                            </Typography>
                          </Grid>
                          <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ openAssigneBadge: true })}>
                              Badge vergeben
                            </Button>
                            <AssigneBadge open={this.state.openAssigneBadge} participant={user}/>
                          </Grid>
                          <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ openUnassigneBadge: true })}>
                              Badge entziehen
                            </Button>
                            <UnassigneBadge open={this.state.openUnassigneBadge} participant={user}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              :
                'Es sind zurzeit keine Nutzer in den Kurs eingeschrieben.'}
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
