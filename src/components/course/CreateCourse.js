import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


export class CreateCourse extends Component {

  state = {
    badges: '',
    msg: null,
    msgType: null,
    name: '',
    globalbadge: [],
    localbadge: [],
    courseprovider: '',
    postalcode: '',
    adress: '',
    coordinates: [],
    topic: '',
    desscription: '',
    requirements: '',
    startdate: null,
    enddate: null,
    size: null
  }

  componentDidMount(){
    axios.get('/api/v1/badge')
      .then(res => {
        this.setState({badges: res.data.badges});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: 'Fehler beim Laden der verfügbaren Badges'});
      });
  }

  componentDidUpdate() {
    if(this.state.msg){
      window.scrollTo(0, 0);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeBadge = e => {
    // https://stackoverflow.com/questions/61115871/finddomnode-error-on-react-material-ui-select-menu
    this.setState({ [e.target.name]: e.target.value });
  };

  onReset = () => {
    this.setState({ msg: null, msgType: null, file: null, url: null, lastname: this.props.user.lastname, email: this.props.user.email, city: this.props.user.city, postalcode: this.props.user.postalcode });
  };

  onSubmit = e => {
    e.preventDefault();
    const { lastname, city, postalcode, email, file } = this.state;
    var updatedUser = new FormData();
    updatedUser.set('lastname', lastname);
    updatedUser.set('city', city);
    updatedUser.set('postalcode', postalcode);
    updatedUser.set('email', email);
    updatedUser.append('profile', file);
    // Request Body
    axios.put('api/v1/user/me', updatedUser)
      .then(res => {
        this.setState({msgType: 'success', msg: res.data.message});
      })
      .catch(err => {
        this.setState({msgType: 'error', msg: err.response.data.message});
      });
  };

  render(){
    const {user} = this.props;
    return(
      <div style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
        {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>
            {(user.image && user.image.path) || this.state.url ?
              <Avatar src={this.state.url || `/media/${user.image.path}`} style={{width: '200px', height: '200px'}}/>
            : <Avatar style={{width: '200px', height: '200px'}}>{user.firstname.charAt(0)}{this.state.lastname.charAt(0)}</Avatar>
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
            <Button color="primary" variant='contained' onClick={() => this.fileInput.click()}>Bild auswählen</Button>
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
              label='Kursanbiete'
              name='courseprovider'
              value={this.state.courseprovider}
              onChange={this.onChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Adresse'
              name='adress'
              value={this.state.adress}
              onChange={this.onChange}
              fullWidth={true}
            />
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
          <Grid item xs={12} md={6}>
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              label="Stadtdatum"
              type="date"
              name="startdate"
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
          </Grid>
          {this.state.badges ?
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
                <InputLabel id="select-localbadge">Lokale Badges</InputLabel>
                <Select
                  labelId="select-localbadge"
                  label="Lokale Badges"
                  name='localbadge'
                  value={[]}
                  onChange={this.onChangeBadge}
                  multiple
                >
                  {this.state.badges.map(badge => (
                    badge.global ? null : <MenuItem key={badge._id} value={badge._id}>{badge.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
                <InputLabel id="select-globalbadge">Globale Badges</InputLabel>
                <Select
                  labelId="select-globalbadge"
                  label="Globale Badges"
                  name='globalbadge'
                  value={this.state.globalbadge}
                  onChange={this.onChangeBadge}
                  multiple
                >
                  {this.state.badges.map(badge => (
                    badge.global ? <MenuItem key={badge._id} value={badge._id}>{badge.name}</MenuItem> : null
                  ))}
                </Select>
              </FormControl>
            </Grid>
            : null
          }
        </Grid>
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Kurs erstellen
          </Button>
        </p>
        <p>
          <Button color="default" variant='contained' onClick={this.onReset} style={{width: '100%'}}>
            Zurücksetzen
          </Button>
        </p>
      </div>
    );
  }
}

CreateCourse.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(CreateCourse);
