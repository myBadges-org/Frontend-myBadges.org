import React, { Component } from 'react';

import BadgeDetails from './BadgeDetails';

import Grid from '@material-ui/core/Grid';
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
    const globalBadges = this.props.badges.filter(badge => (badge.global === true));
    const localBadges = this.props.badges.filter(badge => (badge.global === false));
    return(
      <Grid container spacing={2}>
        <BadgeDetails open={this.state.open} badge={this.state.badge}/>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{margin: '0 4px 10px 4px'}}><b>Global</b></Typography>
          </Grid>
          {globalBadges.length > 0 ?
            globalBadges.map(badge => (
            <Grid item xs={12} sm={6} md={4} key={badge._id}>
              <Paper style={{margin: '4px', cursor: 'pointer'}} onClick={() => {this.badgeDetails(badge)}}>
                {badge.image && badge.image.path ?
                  <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
                : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
                <Typography variant='h6'>
                  {badge.name}
                </Typography>
              </Paper>
            </Grid>
          ))
          : 'Keine globalen Badges verfübar.'}
        </Grid>
        <Grid item xs={12}>
          <Divider style={{margin: '15px 0'}} variant='fullWidth'/>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{margin: '0 4px 10px 4px'}}><b>Lokal</b></Typography>
          </Grid>
          {localBadges.length > 0 ?
            localBadges.map(badge => (
            <Grid item xs={12} sm={6} md={4} key={badge._id}>
              <Paper style={{margin: '4px', cursor: 'pointer'}} onClick={() => {this.badgeDetails(badge)}}>
                {badge.image && badge.image.path ?
                  <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
                : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
                <Typography variant='h6'>
                  {badge.name}
                </Typography>
              </Paper>
            </Grid>
          ))
          : 'Keine lokalen Badges verfübar.'}
        </Grid>
      </Grid>
    );
  }
}


export default CourseBadges;
