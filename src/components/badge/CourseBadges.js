import React, { Component } from 'react';

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

export class CourseBadges extends Component {

  render(){
    return(
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
            {this.props.badges.map(badge => (
              <Grid item xs={6} md={4} key={badge._id}>
                <Paper>
                  {badge.image && badge.image.path ?
                    <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px'}}/>
                  : <Avatar style={{width: '200px', height: '200px'}}></Avatar>}
                  <Typography variant='h6'>
                    {badge.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


export default CourseBadges;
