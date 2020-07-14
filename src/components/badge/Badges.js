import React, { Component } from 'react';

import BadgePaper from './Badge';

import Grid from '@material-ui/core/Grid';

export class Badges extends Component {

  render(){
    const badges = this.props.badges;
    return(
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          {badges.length > 0 ?
            badges.map(badge => (
            <BadgePaper content={badge} key={badge._id} settings={this.props.settings}/>
          ))
          : 'Keine Badges verfübar.'}
        </Grid>
      </Grid>
    );
  }
}

export default Badges;
