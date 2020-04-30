import React, { Component } from 'react';

import BadgeDetails from './BadgeDetails';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export class CourseBadges extends Component {

  state = {
    open: false,
    badge: null
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.open === true){
      this.setState({ open: false });
    }
  }

  badgeDetails = (badge) => {
    this.setState({ open: true, badge: badge });
  }

  render(){
    return(
      <div>
        <ExpansionPanel style={{borderRadius: '4px'}}>
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon icon={faChevronDown} />
            }
          >
            <Badge badgeContent={this.props.badges.length} color="primary">
              <Typography><b>verknüpfte Badges</b></Typography>
            </Badge>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={2}>
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5" style={{marginBottom: '10px'}}><b>Global</b></Typography>
              </Grid>
              {this.props.badges.filter(badge => (badge.global === true)).map(badge => (
                <Grid item xs={12} sm={6} md={4} key={badge._id}>
                  <Paper style={{margin: '0 4px'}} onClick={() => {this.badgeDetails(badge)}}>
                    {badge.image && badge.image.path ?
                      <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
                    : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
                    <Typography variant='h6'>
                      {badge.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Divider style={{margin: '15px 0'}} variant='fullWidth'/>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5" style={{marginBottom: '10px'}}><b>Lokal</b></Typography>
              </Grid>
              {this.props.badges.filter(badge => (badge.global === false)).map(badge => (
                <Grid item xs={12} sm={6} md={4} key={badge._id}>
                  <Paper style={{margin: '0 4px'}} onClick={() => {this.badgeDetails(badge)}}>
                    {badge.image && badge.image.path ?
                      <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
                    : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
                    <Typography variant='h6'>
                      {badge.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <BadgeDetails open={this.state.open} badge={this.state.badge}/>
      </div>
    );
  }
}


export default CourseBadges;
