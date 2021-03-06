import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBadges } from '../../actions/badgeActions';
import { returnSuccess } from '../../actions/messageActions';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import moment from 'moment';

import CreateBadge from '../badge/CreateBadge';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinkMaterial from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    }
  }
});


export class CreateProject extends Component {

  state = {
    project: 'presence',
    open: false,
    msg: null,
    msgType: null,
    file: null,
    url: null,
    name: '',
    badge: [],
    provider: '',
    postalcode: '',
    addresses: [],
    address: '',
    coordinates: [],
    topic: '',
    description: '',
    requirements: '',
    startdate: null,
    enddate: null,
    size: ''
  }

  componentDidMount() {
    this.props.getBadges('/api/v1/badge', { issuer: this.props.user._id });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.open === true) {
      this.setState({ open: false });
    }
    if (this.state.msg) {
      window.scrollTo(0, 0);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    var extensionType = e.target.files[0].type.split('image/')[1];
    if (extensionType !== 'png' && extensionType !== 'jpg' && extensionType !== 'gif' && extensionType !== 'jpeg') {
      this.setState({ msgType: 'error', msg: 'Es sind nur Bilder mit der Dateiendung "PNG", "JPG", "JPEG" und "GIF" erlaubt.' });
    }
    else {
      this.setState({ msgType: null, msg: null, file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  onChangeAddress = e => {
    if (e.target.value) {
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${e.target.value}`)
        .then(res => {
          if (res.data.length > 0) {
            this.setState({ addresses: res.data });
          } else {
            this.setState({ addresses: ['Keine Übereinstimmung gefunden.'] });
          }
        })
        .catch(err => {
          this.setState({ msgType: 'error', msg: err.response.data.message });
        });
    }
    else {
      this.setState({ addresses: [] });
    }
  };

  deleteAddress = () => {
    this.setState({ addresses: [], address: '' });
  };

  setAddress = (address) => {
    this.setState({ addresses: [], address: address.display_name, coordinates: [address.lon, address.lat] });
  };

  onReset = () => {
    this.setState({
      project: 'presence',
      open: false,
      msg: null,
      msgType: null,
      file: null,
      url: null,
      name: '',
      badge: [],
      provider: '',
      postalcode: '',
      addresses: [],
      address: '',
      coordinates: [],
      topic: '',
      description: '',
      requirements: '',
      startdate: null,
      enddate: null,
      size: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { project, name, badge, provider, postalcode, address, coordinates, topic, description, requirements, startdate, enddate, size, file } = this.state;
    var newProject = new FormData();
    newProject.set('name', name);
    newProject.set('provider', provider);
    newProject.set('topic', topic);
    newProject.set('description', description);
    newProject.set('requirements', requirements);
    newProject.set('startdate', moment(startdate).format('YYYY-MM-DD'));
    newProject.set('enddate', moment(enddate).format('YYYY-MM-DD'));
    newProject.set('size', size);
    badge.forEach((item, i) => {
      newProject.append('badge[]', item);
    });
    if (file) {
      newProject.append('image', file);
    }
    if (project !== 'online') {
      newProject.set('postalcode', postalcode);
      newProject.set('address', address);
      coordinates.forEach((item, i) => {
        newProject.append('coordinates[]', item);
      });
    }
    axios.post('/api/v1/project', newProject)
      .then(res => {
        this.props.returnSuccess(res.data.message, res.status, 'ADD_PROJECT_SUCCESS');
        this.props.history.push(`/project/${res.data.project._id}`);
      })
      .catch(err => {
        this.setState({ msgType: 'error', msg: err.response.data.message });
      });
  };

  render() {
    return (
      <div style={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }}>
        {this.state.msg ? <Alert style={{ marginBottom: '10px' }} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
        <Alert style={{ marginBottom: '10px' }} icon={false} severity={'info'}><div>Beachten Sie, dass beim Erstellen eines Projektes ausschließlich Badges auswählbar sind, die man selbstständig vergeben darf. Einen Überblick über alle Badges erhalten Sie <Link to="/badges" className={this.props.classes.link}>hier</Link>.</div></Alert>
        <FormControl component="fieldset">
          <RadioGroup row name="project" value={this.state.project} onClick={this.onChange}>
            <FormControlLabel
              value='presence'
              control={<Radio color="primary" />}
              label="Projekt in Präsenz"
              labelPlacement="start"
            />
            <FormControlLabel
              value='online'
              control={<Radio color="primary" />}
              label="Online-Projekt"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>
            {this.state.url ?
              <Avatar src={this.state.url} style={{ width: '200px', height: '200px' }} />
              : <Avatar style={{ width: '200px', height: '200px' }}></Avatar>
            }
          </Grid>
          <Grid item xs={6}>
            <input
              style={{ display: 'none' }}
              accept="image/*"
              onChange={this.onFileChange}
              name="picture"
              type="file"
              ref={fileInput => this.fileInput = fileInput}
            />
            <Button color="primary" variant='contained' onClick={() => this.fileInput.click()} style={{ top: '50%', transform: 'translateY(-50%)' }}>Bild auswählen</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{ marginBottom: '10px' }}
              variant='outlined'
              type='text'
              label='Name'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              fullWidth={true}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              variant='outlined'
              type='text'
              label='Anbieter des Projektes'
              name='provider'
              value={this.state.provider}
              onChange={this.onChange}
              fullWidth={true}
            />
          </Grid>
          {this.state.project !== 'online' ?
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
              <List style={{ paddingTop: 0, paddingBottom: '10px' }}>
                {this.state.addresses.map((address, i) => (
                  address === 'Keine Übereinstimmung gefunden.' ?
                    <ListItem button key={i} onClick={this.deleteAddress} style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}>
                      <ListItemText>{address}</ListItemText>
                    </ListItem>
                    :
                    <ListItem button key={i} onClick={() => { this.setAddress(address) }} style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}>
                      <ListItemText>{address.display_name}</ListItemText>
                    </ListItem>
                ))}
              </List>
              <TextField
                style={{ marginBottom: '10px' }}
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
              style={{ marginBottom: '10px' }}
              variant='outlined'
              label="Startdatum"
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
              style={{ marginBottom: '10px' }}
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
              style={{ marginBottom: '10px' }}
              variant='outlined'
              type='text'
              label='Thema'
              name='topic'
              value={this.state.topic}
              onChange={this.onChange}
              fullWidth={true}
            />
            <TextField
              style={{ marginBottom: '10px' }}
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
              style={{ marginBottom: '10px' }}
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
              style={{ marginBottom: '10px' }}
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
              <FormControl variant="outlined" fullWidth style={{ marginBottom: '10px' }}>
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
                <LinkMaterial color="primary" onClick={() => { this.setState({ open: true }); }} style={{ cursor: 'pointer' }}>
                  Nicht der richtige Badge dabei?
                  <CreateBadge open={this.state.open} />
                </LinkMaterial>
              </FormControl>
            </Grid>
            : <Grid item xs={12} md={6}>
              {`Sie können aktuell keinen Badge vergeben. Beantragen Sie entweder die Rechte an einen bestehenden Badge `}
              <Link to="/badges" className={this.props.classes.link}>hier</Link>
              {` oder erstellen Sie einen `}
              <LinkMaterial color="primary" onClick={() => { this.setState({ open: true }); }} style={{ cursor: 'pointer' }}>
                neuen Badge
                <CreateBadge open={this.state.open} />
              </LinkMaterial>.
            </Grid>
          }
        </Grid>
        <p>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{ width: '100%' }}>
            Projekt erstellen
          </Button>
        </p>
        <p>
          <Button color="default" variant='contained' onClick={this.onReset} style={{ width: '100%' }}>
            Zurücksetzen
          </Button>
        </p>
      </div>
    );
  }
}

CreateProject.propTypes = {
  user: PropTypes.object.isRequired,
  badges: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  getBadges: PropTypes.func.isRequired,
  returnSuccess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  badges: state.badge.badges,
  message: state.message
});

export default connect(mapStateToProps, { getBadges, returnSuccess })(withRouter(withStyles(styles, { withTheme: true })(CreateProject)));
