import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import CourseBadges from '../badge/CourseBadges';
import CourseInfo from './CourseInfo';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
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

export class Course extends Component {

  state = {
    isLoading: false,
    course: null,
    msg: null,
    msgType: ''
  }

  componentDidMount(){
    const courseId = this.props.match.params.courseId;
    if(!this.props.user){
      this.setState({msg: 'Zum Ein und Ausschreiben in den Kurs müssen Sie sich zunächst anmelden.', msgType: 'info'});
    }
    this.setState({isLoading: true});
    axios.get(`/api/v1/course/${courseId}`)
      .then(res => {
        if(!res.data.course.exists){
          this.setState({ course: res.data.course, isLoading: false, msg: 'Dieser Kurs ist deaktiviert.', msgType: 'info' });
        } else {
          this.setState({ course: res.data.course, isLoading: false });
        }
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message, isLoading: false})
      });
  }

  openPopup = ref => {
    if(ref) ref.leafletElement.openPopup();
  }

  onDelete = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/course/${this.props.match.params.courseId}/deactivation`)
      .then(res => {
        this.props.history.push('/course/me/creator');
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  };

  render(){
    const { course, isLoading, msg, msgType } = this.state;
    if(course && this.props.user){
      console.log(course.creator._id);
      console.log(this.props.user._id);
    }
    return(
      <div>
        {isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={msgType}>{msg}</Alert> : null}
          {!isLoading && course ?
            <div>
              <Paper style={{padding: '15px'}}>
                <Typography variant="h4">
                  {course.name}
                </Typography>
                {course.image && course.image.path ?
                  <img src={`/media/${course.image.path}`} style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
                : null}
                {course.coordinates ?
                  <CourseInfo title='Adresse'>
                    <Map center={[course.coordinates.coordinates[1], course.coordinates.coordinates[0]]} zoom={13} style={{width: '100%', height: '300px', borderRadius: '4px'}}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                      />
                      <Marker ref={(ref) => {this.openPopup(ref)}} position={[course.coordinates.coordinates[1], course.coordinates.coordinates[0]]}>
                        <Popup open>{course.address}</Popup>
                      </Marker>
                    </Map>
                  </CourseInfo>
                  : null
                }
                <CourseInfo title='Zeitraum' content={`vom ${moment(course.startdate).format('DD. MMMM YYYY')} bis ${moment(course.enddate).format('DD. MMMM YYYY')}`} />
                <CourseInfo title='Thema' content={course.topic} />
                <CourseInfo title='Beschreibung' content={course.description} />
                <CourseInfo title='Voraussetzungen' content={course.requirements} />
                <CourseInfo title='Plätze' content={`insgesamt: ${course.size}, davon sind noch ${course.size - course.participants.length} verfügbar`} />
                <CourseBadges badges={course.badge.concat(course.localbadge)}/>
              </Paper>
              {this.props.user && course.exists?
                this.props.user._id === course.creator._id ?
                  <div>
                    <p>
                      <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
                        Bearbeiten
                      </Button>
                    </p>
                    <p>
                      <Button color="primary" variant='contained' onClick={this.onReset} style={{width: '100%'}}>
                        Teilnehmer anzeigen
                      </Button>
                    </p>
                    <p>
                      <Button color="primary" variant='contained' style={{width: '100%'}}>
                        Badges vergeben
                      </Button>
                    </p>
                    <Divider variant='fullWidth'/>
                    <p>
                      <Button classes={{root: this.props.classes.error}} variant='contained' onClick={this.onDelete} style={{width: '100%'}}>
                        Deaktivieren
                      </Button>
                    </p>
                  </div>
                  :
                  course.participants.includes(this.props.user._id) ?
                    <p>
                      <Button color="primary" variant='contained' onClick={this.onReset} style={{width: '100%'}}>
                        Abmelden
                      </Button>
                    </p>
                  :
                    <p>
                      <Button color="primary" variant='contained' onClick={this.onReset} style={{width: '100%'}}>
                        Anmelden
                      </Button>
                    </p>
                : null
                }
            </div>
          :
            null}
        </div>
      </div>
    );
  }
}

Course.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});


export default connect(mapStateToProps, null)(withRouter(withStyles(styles)(Course)));
