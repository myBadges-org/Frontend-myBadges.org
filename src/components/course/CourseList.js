import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBadges } from '../../actions/badgeActions';

import axios from 'axios';
import moment from 'moment';


import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';


export class CourseList extends Component {

  state = {
    courses: null
  }

  componentDidMount(){
    axios.get('/api/v1/course')
      .then(res => {
        this.setState({courses: res.data.courses});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  }

  onFilter = () => {
    const params = {
      params: {
        type: 'presence',
        coordinates: [0, 0],
        radius: 10000
      }
    };

    axios.get('/api/v1/course', params)
      .then(res => {
        this.setState({courses: res.data.courses});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  };


  render(){
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.courses ?
          <div>
            <Button variant='contained' color='primary' onClick={this.onFilter}>Online Filtern</Button>
            {this.state.courses.map(course => (
              <Paper>
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
                          {course.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        : 'Es sind zurzeit keine Kurse verfügbar'}
      </div>
    );
  }
}

export default CourseList;
