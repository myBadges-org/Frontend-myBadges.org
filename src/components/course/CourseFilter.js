import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paramsOnChange, sliderOnChange, onChangeAddress, deleteAddress, setAddress, onReset, onFilter } from '../../actions/courseActions';

import axios from 'axios';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Badge from '@material-ui/core/Badge';

export class CourseFilter extends Component {

  render(){
    return(
      <ExpansionPanel style={{marginBottom: '20px'}}>
        <ExpansionPanelSummary
          expandIcon={
            <FontAwesomeIcon icon={faChevronDown} />
          }
        >
          <Badge badgeContent={this.props.parameter > 0 ? this.props.parameter : null} color="primary">
            <Typography>Filter</Typography>
          </Badge>
          {this.props.courses ? <Typography style={{marginLeft: '30px', color: 'grey'}}>{this.props.courses.length} Kurse</Typography> : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
          <FormControl component="fieldset">
            <RadioGroup row name="type" value={this.props.type} onClick={this.props.paramsOnChange}>
              <FormControlLabel
                value=''
                control={<Radio color="primary" />}
                label="alle"
                labelPlacement="start"
              />
              <FormControlLabel
                value='presence'
                control={<Radio color="primary" />}
                label="Präsenzkurs"
                labelPlacement="start"
              />
              <FormControlLabel
                value='online'
                control={<Radio color="primary" />}
                label="Online-Kurs"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            style={{marginBottom: '10px'}}
            variant='outlined'
            type='text'
            label='Name'
            name='name'
            value={this.props.name}
            onChange={this.props.paramsOnChange}
            fullWidth={true}
          />
          {this.props.type !== 'online' ?
            <div style={{width: '100%'}}>
              <TextField
                variant='outlined'
                type='text'
                label='Adresse'
                name='address'
                value={this.props.address}
                onChange={this.props.paramsOnChange}
                onBlur={this.props.onChangeAddress}
                fullWidth={true}
              />
              <List style={{paddingTop: 0, paddingBottom: '10px'}}>
              {this.props.addresses.map((address, i) => (
                address === 'Keine Übereinstimmung gefunden.' ?
                  <ListItem button key={i} onClick={this.props.deleteAddress} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                    <ListItemText>{address}</ListItemText>
                  </ListItem>
                :
                <ListItem button key={i} onClick={() => {this.props.setAddress(address)}} style={{border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px'}}>
                  <ListItemText>{address.display_name}</ListItemText>
                </ListItem>
              ))}
              </List>
              {this.props.coordinates ?
                <div>
                  <Typography id="slider" gutterBottom>
                    Radius (in km)
                  </Typography>
                  <Slider
                    style={{marginTop: '35px'}}
                    valueLabelDisplay="on"
                    aria-labelledby="slider"
                    // valueLabelFormat={() => {return this.state.radius + ' km'}}
                    value={this.props.radius}
                    min={5}
                    max={150}
                    onChange={this.props.sliderOnChange}
                  />
                </div>
                : null}
            </div>
          : null}
          <TextField
            style={{marginBottom: '10px'}}
            variant='outlined'
            type='text'
            label='Thema'
            name='topic'
            value={this.props.topic}
            onChange={this.props.paramsOnChange}
            fullWidth={true}
          />
          <TextField
            style={{marginBottom: '10px'}}
            variant='outlined'
            label="Stadtdatum"
            type="date"
            name="startdate"
            value={moment(this.props.startdate).format('YYYY-MM-DD')}
            onChange={this.props.paramsOnChange}
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
            value={moment(this.props.enddate).format('YYYY-MM-DD')}
            onChange={this.props.paramsOnChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth={true}
          />
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button variant='contained' onClick={() => {this.props.onReset(this.props.url)}}>Zurücksetzen</Button>
          <Button variant='contained' color='primary' onClick={() => {this.props.onFilter(this.props.url)}}>Filtern</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

CourseFilter.propTypes = {
  paramsOnChange: PropTypes.func.isRequired,
  sliderOnChange: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courses: state.course.courses,
  type: state.course.params.type,
  name: state.course.params.name,
  topic: state.course.params.topic,
  coordinates: state.course.params.coordinates,
  radius: state.course.params.radius,
  startdate: state.course.params.startdate,
  enddate: state.course.params.enddate,
  parameter: state.course.params.parameter,
  addresses: state.course.params.addresses,
  address: state.course.params.address,
});

export default connect(mapStateToProps, { paramsOnChange, sliderOnChange, onChangeAddress, deleteAddress, setAddress, onReset, onFilter })(CourseFilter);
