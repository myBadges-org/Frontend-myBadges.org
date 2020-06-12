import React, { Component } from 'react';

import BadgePaper from './Badge';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export class CourseBadges extends Component {

  render(){
    const globalBadges = this.props.badges;
    // const localBadges = this.props.badges.filter(badge => (badge.global === false));
    return(
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{margin: '0 4px 10px 4px'}}><b>Badges</b></Typography>
          </Grid>
          {globalBadges.length > 0 ?
            globalBadges.map(badge => (
            <BadgePaper content={badge} key={badge._id} settings={this.props.settings}/>
          ))
          : 'Keine Badges verfübar.'}
        </Grid>
        {/* <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{margin: '0 4px 10px 4px'}}><b>Global</b></Typography>
          </Grid>
          {globalBadges.length > 0 ?
            globalBadges.map(badge => (
            <BadgePaper content={badge} key={badge._id} settings={this.props.settings}/>
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
            <BadgePaper content={badge} key={badge._id} settings={this.props.settings}/>
          ))
          : 'Keine lokalen Badges verfübar.'}
        </Grid> */}
      </Grid>
    );
  }
}


export default CourseBadges;
