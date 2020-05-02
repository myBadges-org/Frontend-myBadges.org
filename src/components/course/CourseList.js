import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, clearParams } from '../../actions/courseActions';

import { Link } from 'react-router-dom';

import CourseFilter from './CourseFilter';
import CourseListMap from './CourseListMap';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';


export class CourseList extends Component {

  state = {
    msg: null,
    msgType: ''
  }

  componentDidMount(){
    this.props.clearParams();
    this.props.loadCourses('/api/v1/course');
  }

  componentDidUpdate(prevProps){
    const { message } = this.props;
    if (message !== prevProps.message) {
      // Check for course error
      if(message.id === 'COURSES_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
      else {
        this.setState({msg: null, msgType: ''});
      }
    }
  }

  render(){
    return(
      <div>
        {this.props.course.isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {!this.props.course.isLoading ?
            <div>
            <CourseFilter url={'/api/v1/course'}/>
            <CourseListMap />
            {this.props.course.courses && this.props.course.courses.length > 0 ?
              this.props.course.courses.map(course => (
                <Link key={course._id} to={`/course/${course._id}`} style={{textDecoration: 'none'}}>
                  <Paper style={{marginBottom: '15px'}}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {(course.image && course.image.path) ?
                          <Avatar src={`/media/${course.image.path}`} style={{width: '200px', height: '200px'}}/>
                        : <Avatar style={{width: '200px', height: '200px'}}></Avatar>
                        }
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {course.name}
                            </Typography>
                            <Typography variant="body2">
                              Zeitraum von {course.startdate} bis {course.enddate}
                            </Typography>
                            <Typography variant="body2">
                              Thema: {course.topic}
                            </Typography>
                            <Typography variant="body2">
                              Beschreibung: {course.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Link>
              ))
            :
              'Es sind zurzeit keine Kurse verfügbar'}
            </div>
          :
            null
          }
        </div>
      </div>
    );
  }
}

CourseList.propTypes = {
  course: PropTypes.object,
  message: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  clearParams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  message: state.message
});

export default connect(mapStateToProps, { loadCourses, clearParams })(CourseList);
