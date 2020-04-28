import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, clearParams } from '../../actions/courseActions';

import CourseFilter from './CourseFilter';

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
    this.props.loadCourses();
  }

  componentDidUpdate(prevProps){
    const { message } = this.props;
    if (message !== prevProps.message) {
      // Check for course error
      if(message.id === 'COURSE_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
      else {
        this.setState({msg: null, msgType: ''});
      }
    }
  }

  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  //
  // onSliderChange = (e, newValue) => {
  //   this.setState({ radius: newValue });
  // };
  //
  // onChangeAddress = e => {
  //   if(e.target.value){
  //     axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${e.target.value}`)
  //       .then(res => {
  //         if(res.data.length > 0){
  //           this.setState({addresses: res.data});
  //         } else {
  //           this.setState({addresses: ['Keine Übereinstimmung gefunden.']});
  //         }
  //       })
  //       .catch(err => {
  //         this.setState({msgType: 'error', msg: err.response.data.message});
  //       });
  //   }
  //   else {
  //     this.setState({addresses: []});
  //   }
  // };
  //
  // deleteAddress = () => {
  //   this.setState({ addresses: [], address: '' });
  // };
  //
  // setAddress = (address) => {
  //   this.setState({ addresses: [], address: address.display_name, coordinates: [address.lon, address.lat] });
  // };
  //
  // onReset = () => {
  //   this.setState({loaded: false, type: '', addresses: [], address: '', coordinates: null, radius: 15, startdate: null, enddate: null, parameter: 0});
  //   axios.get('/api/v1/course')
  //     .then(res => {
  //       this.setState({courses: res.data.courses, loaded: true});
  //     })
  //     .catch(err => {
  //       this.setState({/*msgType: 'error', msg: err.response.data.message,*/loaded: true});
  //     });
  // };
  //
  // onFilter = () => {
  //   const { type, coordinates, radius, startdate, enddate, topic, name } = this.state;
  //   const config = {
  //     params: {
  //       startdate,
  //       enddate,
  //       topic,
  //       name
  //     }
  //   };
  //   if(type !== ''){
  //     config.params.type = type;
  //   }
  //   if(type !== 'online' && coordinates){
  //     config.params.coordinates = coordinates;
  //     config.params.radius = radius;
  //   }
  //   const parameter = Object.values(config.params).filter(param => param !== null && param !== undefined && param !== '');
  //   this.setState({loaded: false, parameter: parameter.length});
  //   axios.get('/api/v1/course', config)
  //     .then(res => {
  //       this.setState({courses: res.data.courses, loaded: true});
  //     })
  //     .catch(err => {
  //       this.setState({/*msgType: 'error', msg: err.response.data.message,*/loaded: true});
  //     });
  // };


  render(){
    // const filter =
    //   <ExpansionPanel style={{marginBottom: '20px'}}>
    //     <ExpansionPanelSummary
    //       expandIcon={
    //         <FontAwesomeIcon icon={faChevronDown} />
    //       }
    //     >
    //       <Badge badgeContent={this.state.parameter > 0 ? this.state.parameter : null} color="primary">
    //         <Typography>Filter</Typography>
    //       </Badge>
    //     </ExpansionPanelSummary>
    //     <ExpansionPanelDetails>
    //       <Grid container spacing={1}>
    //       <FormControl component="fieldset">
    //         <RadioGroup row name="type" value={this.state.type} onClick={this.onChange}>
    //           <FormControlLabel
    //             value=''
    //             control={<Radio color="primary" />}
    //             label="alle"
    //             labelPlacement="start"
    //           />
    //           <FormControlLabel
    //             value='presence'
    //             control={<Radio color="primary" />}
    //             label="Präsenzkurs"
    //             labelPlacement="start"
    //           />
    //           <FormControlLabel
    //             value='online'
    //             control={<Radio color="primary" />}
    //             label="Online-Kurs"
    //             labelPlacement="start"
    //           />
    //         </RadioGroup>
    //       </FormControl>
    //       <TextField
    //         style={{marginBottom: '10px'}}
    //         variant='outlined'
    //         type='text'
    //         label='Name'
    //         name='name'
    //         value={this.state.name}
    //         onChange={this.onChange}
    //         fullWidth={true}
    //       />
    //       {this.state.type !== 'online' ?
    //         <div style={{width: '100%'}}>
    //           <TextField
    //             variant='outlined'
    //             type='text'
    //             label='Adresse'
    //             name='address'
    //             value={this.state.address}
    //             onChange={this.onChange}
    //             onBlur={this.onChangeAddress}
    //             fullWidth={true}
    //           />
    //           <List style={{paddingTop: 0, paddingBottom: '10px'}}>
    //           {this.state.addresses.map((address, i) => (
    //             address === 'Keine Übereinstimmung gefunden.' ?
    //               <ListItem button key={i} onClick={this.deleteAddress} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
    //                 <ListItemText>{address}</ListItemText>
    //               </ListItem>
    //             :
    //             <ListItem button key={i} onClick={() => {this.setAddress(address)}} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
    //               <ListItemText>{address.display_name}</ListItemText>
    //             </ListItem>
    //           ))}
    //           </List>
    //           {this.state.coordinates ?
    //             <div>
    //               <Typography id="slider" gutterBottom>
    //                 Radius (in km)
    //               </Typography>
    //               <Slider
    //                 style={{marginTop: '35px'}}
    //                 valueLabelDisplay="on"
    //                 aria-labelledby="slider"
    //                 // valueLabelFormat={() => {return this.state.radius + ' km'}}
    //                 value={this.state.radius}
    //                 min={5}
    //                 max={150}
    //                 onChange={this.onSliderChange}
    //               />
    //             </div>
    //             : null}
    //         </div>
    //       : null}
    //       <TextField
    //         style={{marginBottom: '10px'}}
    //         variant='outlined'
    //         type='text'
    //         label='Thema'
    //         name='topic'
    //         value={this.state.topic}
    //         onChange={this.onChange}
    //         fullWidth={true}
    //       />
    //       <TextField
    //         style={{marginBottom: '10px'}}
    //         variant='outlined'
    //         label="Stadtdatum"
    //         type="date"
    //         name="startdate"
    //         value={moment(this.state.startdate).format('YYYY-MM-DD')}
    //         onChange={this.onChange}
    //         InputLabelProps={{
    //           shrink: true
    //         }}
    //         fullWidth={true}
    //       />
    //       <TextField
    //         style={{marginBottom: '10px'}}
    //         variant='outlined'
    //         label="Enddatum"
    //         type="date"
    //         name="enddate"
    //         value={moment(this.state.enddate).format('YYYY-MM-DD')}
    //         onChange={this.onChange}
    //         InputLabelProps={{
    //           shrink: true
    //         }}
    //         fullWidth={true}
    //       />
    //       </Grid>
    //     </ExpansionPanelDetails>
    //     <ExpansionPanelActions>
    //       <Button variant='contained' onClick={this.onReset}>Zurücksetzen</Button>
    //       <Button variant='contained' color='primary' onClick={this.onFilter}>Filtern</Button>
    //     </ExpansionPanelActions>
    //   </ExpansionPanel>;
    return(
      <div>
        {this.props.course.isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {!this.props.course.isLoading ?
            <div>
            <CourseFilter/>
            {this.props.course.courses && this.props.course.courses.length > 0 ?
              this.props.course.courses.map(course => (
                <Paper key={course._id}>
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
  course: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  clearParams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  message: state.message
});

export default connect(mapStateToProps, { loadCourses, clearParams })(CourseList);
