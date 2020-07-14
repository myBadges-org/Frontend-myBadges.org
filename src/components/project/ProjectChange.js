import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBadges } from '../../actions/badgeActions';
import { updateProject } from '../../actions/projectActions';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import CreateBadge from '../badge/CreateBadge';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export class ProjectChange extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      openBadgeCreator: false,
      msg: null,
      msgType: null,
      file: null,
      url: props.project.image ? `/media/${props.project.image.path}` : '',
      name: props.project.name,
      badge: props.project.badge.map(badge => {return badge._id}),
      provider: props.project.provider,
      postalcode: props.project.postalcode,
      addresses: [],
      address: props.project.address,
      coordinates: props.project.coordinates && props.project.coordinates.coordinates,
      topic: props.project.topic,
      description: props.project.description,
      requirements: props.project.requirements,
      startdate: props.project.startdate,
      enddate: props.project.enddate,
      size: props.project.size,
    }
  }

  componentDidMount(){
    this.props.getBadges({issuer: this.props.user._id});
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.openBadgeCreator === true){
      this.setState({ openBadgeCreator: false });
    }
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'PROJECT_UPDATED_SUCCESS'){
        this.toggle();
      }
      // Check for project updated error
      if(message.id === 'PROJECT_UPDATED_ERROR'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
      else {
        this.setState({msg: null});
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    var extensionType = e.target.files[0].type.split('image/')[1];
    if(extensionType !== 'png' && extensionType !== 'jpg' && extensionType !== 'gif' && extensionType !== 'jpeg') {
      this.setState({ msgType: 'error', msg: 'Es sind nur Bilder mit der Dateiendung "PNG", "JPG", "JPEG" und "GIF" erlaubt.' });
    }
    else {
      this.setState({ msgType: null, msg: null, file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  onChangeAddress = e => {
    if(e.target.value){
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${e.target.value}`)
        .then(res => {
          if(res.data.length > 0){
            this.setState({addresses: res.data});
          } else {
            this.setState({addresses: ['Keine Übereinstimmung gefunden.']});
          }
        })
        .catch(err => {
          this.setState({msgType: 'error', msg: err.response.data.message});
        });
    }
    else {
      this.setState({addresses: []});
    }
  };

  deleteAddress = () => {
    this.setState({ addresses: [], address: '' });
  };

  setAddress = (address) => {
    this.setState({ addresses: [], address: address.display_name, coordinates: [address.lon, address.lat] });
  };


  // isChanged = () => {
  //   var { size, enddate, startdate, requirements, description, topic, coordinates, address, postalcode, provider, localbadge, globalbadge, name, url } = this.state;
  //   const changedProject = {
  //     size, enddate, startdate, requirements, description, topic, coordinates, address, postalcode, provider, localbadge, badge: globalbadge, name, url
  //   };
  //
  //   var { size, enddate, startdate, requirements, description, topic, coordinates, address, postalcode, provider, localbadge, badge, name, image } = this.props.project;
  //   const originalProject = {
  //     size, enddate, startdate, requirements, description, topic, coordinates, address, postalcode, provider, localbadge, badge, name, url: image ? `/media/${image.path}` : ''
  //   };
  //   this.setState({ changed: originalProject === changedProject });
  // }

  onReset = () => {
    this.setState({
      open: false,
      openBadgeCreator: false,
      msg: null,
      msgType: null,
      file: null,
      url: this.props.project.image ? `/media/${this.props.project.image.path}` : null,
      name: this.props.project.name,
      badge: this.props.project.badge,
      provider: this.props.project.provider,
      postalcode: this.props.project.postalcode ? this.props.project.postalcode : '',
      addresses: [],
      address: this.props.project.address ? this.props.project.address : '',
      coordinates: this.props.project.coordinates ? this.props.project.coordinates.coordinates : [],
      topic: this.props.project.topic,
      description: this.props.project.description,
      requirements: this.props.project.requirements,
      startdate: this.props.project.startdate,
      enddate: this.props.project.enddate,
      size: this.props.project.size
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, badge, provider, postalcode, address, coordinates, topic, description, requirements, startdate, enddate, size, file } = this.state;
    var updatedProject = new FormData();
    updatedProject.set('name', name);
    updatedProject.set('provider', provider);
    updatedProject.set('topic', topic);
    updatedProject.set('description', description);
    updatedProject.set('requirements', requirements);
    updatedProject.set('startdate', moment(startdate).format('YYYY-MM-DD'));
    updatedProject.set('enddate', moment(enddate).format('YYYY-MM-DD'));
    updatedProject.set('size', size);
    badge.forEach((item, i) => {
      updatedProject.append('badge[]', item);
    });
    if(file){
      updatedProject.append('image', file);
    }
    if(this.props.project.coordinates){
      updatedProject.set('postalcode', postalcode);
      updatedProject.set('address', address);
      coordinates.forEach((item, i) => {
        updatedProject.append('coordinates[]', item);
      });
    }
    this.props.updateProject(this.props.match.params.projectId, updatedProject);
  };

  toggle = () => {
    this.setState({ open: false });
  };

  render(){
    const { project } = this.props;
    return (
      project ?
        <Dialog
          open={this.state.open}
          maxWidth='md'
          fullWidth
          onClose={this.toggle}
        >
          <DialogTitle>"{project.name}" bearbeiten</DialogTitle>
          <DialogContent>
            <div>
              {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  {this.state.url ?
                    <Avatar src={this.state.url} style={{width: '200px', height: '200px'}}/>
                  : <Avatar style={{width: '200px', height: '200px'}}></Avatar>
                  }
                </Grid>
                <Grid item xs={6}>
                  <input
                    style={{display: 'none'}}
                    accept="image/*"
                    onChange={this.onFileChange}
                    name="picture"
                    type="file"
                    ref={fileInput => this.fileInput = fileInput}
                  />
                  <Button color="primary" variant='contained' onClick={() => this.fileInput.click()} style={{top: '50%', transform: 'translateY(-50%)'}}>Bild auswählen</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='Name'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='Anbieter des Projektes'
                    name='provider'
                    value={this.state.provider}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                </Grid>
                {this.props.project.coordinates ?
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant='outlined'
                      type='text'
                      label='Adresse'
                      name='address'
                      value={this.state.address}
                      onChange={this.onChange}
                      onBlur={this.onChangeAddress}
                      fullWidth={true}
                    />
                    <List style={{paddingTop: 0, paddingBottom: '10px'}}>
                    {this.state.addresses.map((address, i) => (
                      address === 'Keine Übereinstimmung gefunden.' ?
                        <ListItem button key={i} onClick={this.deleteAddress} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                          <ListItemText>{address}</ListItemText>
                        </ListItem>
                      :
                      <ListItem button key={i} onClick={() => {this.setAddress(address)}} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                        <ListItemText>{address.display_name}</ListItemText>
                      </ListItem>
                    ))}
                    </List>
                    <TextField
                      style={{marginBottom: '10px'}}
                      variant='outlined'
                      type='text'
                      label='Postleitzahl'
                      name='postalcode'
                      value={this.state.postalcode}
                      onChange={this.onChange}
                      fullWidth={true}
                    />
                  </Grid>
                : null}
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    label="Stadtdatum"
                    type="date"
                    name="startdate"
                    placeholder="JJJJ-MM-TT"
                    value={moment(this.state.startdate).format('YYYY-MM-DD')}
                    onChange={this.onChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth={true}
                  />
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    label="Enddatum"
                    type="date"
                    name="enddate"
                    placeholder="JJJJ-MM-TT"
                    value={moment(this.state.enddate).format('YYYY-MM-DD')}
                    onChange={this.onChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='Thema'
                    name='topic'
                    value={this.state.topic}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='Beschreibung'
                    name='description'
                    multiline
                    value={this.state.description}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='Voraussetzungen'
                    name='requirements'
                    multiline
                    value={this.state.requirements}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                  <TextField
                    style={{marginBottom: '10px'}}
                    variant='outlined'
                    type='text'
                    label='max. Teilnehmeranzahl'
                    name='size'
                    value={this.state.size}
                    onChange={this.onChange}
                    fullWidth={true}
                  />
                </Grid>
                {this.props.badges.length > 0 ?
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
                      <InputLabel id="select-badge">Badges</InputLabel>
                      <Select
                        labelId="select-badge"
                        label="Badges"
                        name='badge'
                        value={this.state.badge}
                        onChange={this.onChange}
                        multiple
                      >
                        {this.props.badges.map(badge => (
                          <MenuItem key={badge._id} value={badge._id}>{badge.name}</MenuItem>
                        ))}
                      </Select>
                      <Link color="primary" onClick={() => {this.setState({ openBadgeCreator: true });}} style={{cursor: 'pointer'}}>
                        Nicht der richtige Badge dabei?
                        <CreateBadge open={this.state.openBadgeCreator}/>
                      </Link>
                    </FormControl>
                  </Grid>
                  : null
                }
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="default" variant='contained' onClick={this.onReset}>
              Abbrechen
            </Button>
            <Button color="primary" variant='contained' onClick={this.onSubmit}>
              Projekt ändern
            </Button>
          </DialogActions>
        </Dialog>
      : null
    );
  }
}

ProjectChange.propTypes = {
  user: PropTypes.object.isRequired,
  badges: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  getBadges: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  badges: state.badge.badges,
  message: state.message
});

export default connect(mapStateToProps, { getBadges, updateProject })(withRouter(ProjectChange));
