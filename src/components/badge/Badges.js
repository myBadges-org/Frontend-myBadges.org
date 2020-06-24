import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BadgePaper from './Badge';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export class CourseBadges extends Component {

  render(){
    const badges = this.props.badges;
    return(
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{margin: '0 4px 10px 4px'}}><b>Badges</b></Typography>
          </Grid>
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

CourseBadges.propTypes = {
  badges: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  badges: state.badge.badges,
  message: state.message
});

export default connect(mapStateToProps, null)(CourseBadges);
