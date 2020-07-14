import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onFilter, onReset, paramsOnChange } from '../../actions/badgeActions';

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';

export class BadgeFilter extends Component {

  render(){
    return(
      <ExpansionPanel style={{marginBottom: '20px', borderRadius: '4px'}}>
        <ExpansionPanelSummary
          expandIcon={
            <FontAwesomeIcon icon={faChevronDown} />
          }
        >
          <Badge badgeContent={this.props.parameter > 0 ? this.props.parameter : null} color="primary">
            <Typography>Filter</Typography>
          </Badge>
          {this.props.badges ? <Typography style={{marginLeft: '30px', color: 'grey'}}>{this.props.badges.length} Badges</Typography> : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <FormControl component="fieldset">
              <RadioGroup row name="category" value={this.props.category} onClick={this.props.paramsOnChange}>
                <FormControlLabel
                  value=''
                  control={<Radio color="primary" />}
                  label="alle"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value='achievement'
                  control={<Radio color="primary" />}
                  label="Erfolg"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value='professional skill'
                  control={<Radio color="primary" />}
                  label="Fachkompetenz"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value='meta skill'
                  control={<Radio color="primary" />}
                  label="Meta-Kompetenz"
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
            <TextField
            style={{marginBottom: '10px'}}
            variant='outlined'
            type='text'
            label='Beschreibung'
            name='description'
            value={this.props.description}
            onChange={this.props.paramsOnChange}
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

BadgeFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  paramsOnChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  badges: state.badge.badges,
  category: state.badge.params.category,
  name: state.badge.params.name,
  description: state.badge.params.description,
  parameter: state.badge.params.parameter
});

export default connect(mapStateToProps, { onFilter, onReset, paramsOnChange })(BadgeFilter);
