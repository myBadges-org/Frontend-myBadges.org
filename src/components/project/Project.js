import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProject, signIn, signOut } from '../../actions/projectActions';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Badges from '../badge/Badges';
import AssigneMultipleBadges from '../badge/AssigneMultipleBadges';
import ProjectChange from './ProjectChange';
import Participants from './Participants';
import ProjectInfo from './ProjectInfo';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';


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

export class Project extends Component {

  state = {
    msg: null,
    msgType: '',
    openProjectChange: false,
    openParticipants: false,
    openAssigneBadges: false
  }

  componentDidMount(){
    const projectId = this.props.match.params.projectId;
    this.props.loadProject(projectId);
    if(this.props.message.id === 'ADD_PROJECT_SUCCESS'){
      this.setState({msg: this.props.message.msg, msgType: 'success'});
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if((previousProps.isAuthenticated === null && this.props.isAuthenticated === false) || (previousProps.isAuthenticated && this.props.isAuthenticated === false)){
      this.setState({msg: <div>Zum Ein- und Ausschreiben in das Projekt müssen Sie sich zunächst <Link href="/login">einloggen</Link>.</div>, msgType: 'info'});
    }
    if(this.state.openProjectChange === true){
      this.setState({ openProjectChange: false });
    }
    if(this.state.openParticipants === true){
      this.setState({ openParticipants: false });
    }
    if(this.state.openAssigneBadges === true){
      this.setState({ openAssigneBadges: false });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'PROJECT_DEACTIVATED'){
        this.setState({msg: message.msg, msgType: 'info'});
      }
      // Check for project update success
      if(message.id === 'PROJECT_UPDATED_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'});
        window.scrollTo(0, 0);
      }
      // Check for project error
      if(message.id === 'PROJECT_ERROR' || message.id === 'PROJECT_REGISTRATION_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
        window.scrollTo(0, 0);
      }
      // else {
      //   this.setState({msg: null});
      // }
    }
  }

  openPopup = ref => {
    if(ref) ref.leafletElement.openPopup();
  }

  onDelete = (e) => {
    e.preventDefault();
    const config = {
      success: res => {
        this.props.history.push('/project/me/creator');
      },
      error: err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      }
    };
    axios.put(`/api/v1/project/${this.props.match.params.projectId}/deactivation`, {}, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        if(err.response.status !== 401){
          err.config.error(err);
        }
      });
  };

  render(){
    const { msg, msgType } = this.state;
    const { isLoading, project, user } = this.props;
    const badges = project ? project.badge : null;
    return(
      <div>
        {isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={msgType}>{msg}</Alert> : null}
          {!isLoading && project ?
            <div>
              <Paper style={{padding: '15px'}}>
                <Typography variant="h4">
                  {project.name}
                </Typography>
                {project.image && project.image.path ?
                  <img src={`/media/${project.image.path}`} alt={`Bild vom Projekt ${project.name}`} style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
                : null}
                {project.coordinates ?
                  <ProjectInfo
                    title='Adresse'
                    expanded='address'
                  >
                    <Map center={[project.coordinates.coordinates[1], project.coordinates.coordinates[0]]} zoom={13} style={{width: '100%', height: '300px', borderRadius: '4px'}}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                      />
                      <Marker ref={(ref) => {this.openPopup(ref)}} position={[project.coordinates.coordinates[1], project.coordinates.coordinates[0]]}>
                        <Popup open>{project.address}</Popup>
                      </Marker>
                    </Map>
                  </ProjectInfo>
                : null
                }
                <ProjectInfo
                  title='Zeitraum'
                  expanded='time'
                  content={`vom ${moment(project.startdate).format('DD. MMMM YYYY')} bis ${moment(project.enddate).format('DD. MMMM YYYY')}`}
                />
                <ProjectInfo
                  title='Thema'
                  expanded='topic'
                  content={project.topic}
                />
                <ProjectInfo
                  title='Beschreibung'
                  expanded='description'
                  content={project.description}
                />
                <ProjectInfo
                  title='Voraussetzungen'
                  expanded='requirements'
                  content={project.requirements}
                />
                <ProjectInfo
                  title='Plätze'
                  expanded='size'
                  content={`insgesamt: ${project.size}, davon sind noch ${project.size - project.participants.length} verfügbar`}
                />
                <ProjectInfo
                  title={
                    <Badge badgeContent={badges.length} color="primary">
                      <b>verknüpfte Badges</b>
                    </Badge>
                  }
                  expanded='badge'
                >
                  <Badges badges={badges}/>
                </ProjectInfo>
              </Paper>
              {user && project.exists?
                user._id === project.creator._id ?
                  <div>
                    <p>
                      <Button color="primary" variant='contained' onClick={() => this.setState({openProjectChange: true})} style={{width: '100%'}}>
                        Bearbeiten
                      </Button>
                      <ProjectChange open={this.state.openProjectChange} project={project}/>
                    </p>
                    <p>
                      <Button color="primary" variant='contained' onClick={() => this.setState({openParticipants: true})} style={{width: '100%'}}>
                        Teilnehmer anzeigen
                      </Button>
                      <Participants open={this.state.openParticipants} projectName={project.name}/>
                    </p>
                    <p>
                      <Button color="primary" variant='contained' onClick={() => this.setState({openAssigneBadges: true})} style={{width: '100%'}}>
                        Badges vergeben
                      </Button>
                      <AssigneMultipleBadges open={this.state.openAssigneBadges}/>
                    </p>
                    <Divider variant='fullWidth'/>
                    <p>
                      <Button classes={{root: this.props.classes.error}} variant='contained' onClick={this.onDelete} style={{width: '100%'}}>
                        Deaktivieren
                      </Button>
                    </p>
                  </div>
                  :
                  project.participants.includes(user._id) ?
                    <p>
                      <Button color="primary" variant='contained' onClick={() => this.props.signOut(project._id)} style={{width: '100%'}}>
                        Abmelden
                      </Button>
                    </p>
                  :
                    <p>
                      <Button color="primary" variant='contained' onClick={() => this.props.signIn(project._id)} style={{width: '100%'}}>
                        Anmelden
                      </Button>
                    </p>
                : null
                }
            </div>
          : null}
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  project: PropTypes.object,
  loadProject: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  message: state.message,
  isLoading: state.project.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  project: state.project.project
});


export default connect(mapStateToProps, { loadProject, signIn, signOut })(withRouter(withStyles(styles)(Project)));
