import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProjects, clearParams } from '../../actions/projectActions';

import moment from 'moment';
import { Link } from 'react-router-dom';

import ProjectFilter from './ProjectFilter';
import Code from './Code';
import ProjectListMap from './ProjectListMap';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';


export class ProjectList extends Component {

  constructor(props){
    super(props);
    this.state = {
      msg: null,
      msgType: '',
    };
  }

  componentDidMount(){
    this.props.clearParams();
    this.props.loadProjects(this.props.url);
  }

  componentDidUpdate(prevProps){
    if(prevProps.url !== this.props.url){
      this.props.loadProjects(this.props.url);
    }
    const { message } = this.props;
    if (message !== prevProps.message) {
      // Check for project error
      if(message.id === 'PROJECTS_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
      else if(message.id === 'PROJECTS_SUCCESS'){
        this.setState({msg: message.msg, msgType: 'success'});
      }
      else {
        this.setState({msg: null, msgType: ''});
      }
    }
  }

  render(){
    return(
      <div>
        {this.props.project.isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {!this.props.project.isLoading ?
            <div>
            {/^.*project\/me$/.test(this.props.url) ?
              <Code url={this.props.url}/>
            : null}
            <ProjectFilter url={this.props.url}/>
            <ProjectListMap />
            {this.props.project.projects && this.props.project.projects.length > 0 ?
              this.props.project.projects.map(project => (
                <Link key={project._id} to={`/project/${project._id}`} style={{textDecoration: 'none'}}>
                  <Paper style={{marginBottom: '15px'}}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {(project.image && project.image.path) ?
                          <Avatar src={`/media/${project.image.path}`} style={{width: '200px', height: '200px'}}/>
                        : <Avatar style={{width: '200px', height: '200px'}}></Avatar>
                        }
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="body1">
                              <b>{project.name}</b>
                            </Typography>
                            <Typography variant="body2">
                              Zeitraum von {moment(project.startdate).format('LL')} bis {moment(project.enddate).format('LL')}
                            </Typography>
                            <Typography variant="body2">
                              Thema: {project.topic}
                            </Typography>
                            <Typography variant="body2">
                              Beschreibung: {project.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Link>
              ))
            :
              'Es sind zurzeit keine Projekte verfügbar.'}
            </div>
          :
            null
          }
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  project: PropTypes.object,
  message: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  clearParams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  message: state.message
});

export default connect(mapStateToProps, { loadProjects, clearParams })(ProjectList);
