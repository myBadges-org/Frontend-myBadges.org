import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBadge } from '../../actions/badgeActions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export class CreateBadge extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      msg: null,
      msgType: null,
      file: null,
      url: null,
      name: '',
      description: '',
      criteria: '',
      category: ''
    };
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: this.props.open });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      if(message.id === 'ADD_BADGE_SUCCESS'){
        this.toggle();
      }
      // Check for login error
      if(message.id === 'ADD_BADGE_FAIL'){
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

  toggle = () => {
    this.setState({
      open: false,
      msg: null,
      msgType: null,
      file: null,
      url: null,
      name: '',
      description: '',
      criteria: '',
      category: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, description, criteria, file, category } = this.state;
    var newBadge = new FormData();
    newBadge.set('name', name);
    newBadge.set('description', description);
    newBadge.set('criteria', criteria);
    newBadge.set('category', category);
    newBadge.append('image', file);
    if(name !== '' && description !== '' && criteria !== '' && category !== ''){
      this.props.addBadge(newBadge);
    }
    else {
      this.setState({msgType: 'error', msg: 'Füllen Sie alle angegebenen Felder aus.'});
    }
  };

  render(){
    return(
      <Dialog open={this.state.open}>
        <DialogTitle>Neuen Badge erstellen</DialogTitle>
        <DialogContent>
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
          </Grid>
          <FormControl
            style={{marginBottom: '10px', marginTop: '10px'}}
            variant="outlined"
            fullWidth={true}
          >
            <InputLabel id='category'>Kategorie</InputLabel>
            <Select
              labelId='category'
              value={this.state.category}
              onChange={this.onChange}
              label='Kategorie'
              name='category'
            >
              <MenuItem value={'achievement'}>{'Erfolg'}</MenuItem>
              <MenuItem value={'professional skill'}>{'Fachkompetenz'}</MenuItem>
              <MenuItem value={'meta skill'}>{'Meta-Kompetenz'}</MenuItem>
            </Select>
          </FormControl>
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
            label='Beschreibung'
            name='description'
            multiline
            value={this.state.description}
            onChange={this.onChange}
            fullWidth={true}
          />
          <TextField
            style={{marginBottom: '10px'}}
            variant='outlined'
            type='text'
            label='Kriterien'
            name='criteria'
            multiline
            value={this.state.requirements}
            onChange={this.onChange}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button color="default" variant='contained' onClick={this.toggle} style={{width: '100%'}}>
            Abbrechen
          </Button>
          <Button color="primary" variant='contained' onClick={this.onSubmit} style={{width: '100%'}}>
            Badge erstellen
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateBadge.propTypes = {
  badges: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  addBadge: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  badges: state.badge.badges,
  message: state.message
});

export default connect(mapStateToProps, { addBadge })(CreateBadge);
