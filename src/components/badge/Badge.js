import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestBadgePermission } from '../../actions/badgeActions';

import BadgeDetails from './BadgeDetails';
import BadgeSettings from './BadgeSettings';
import BadgeAssignment from './BadgeAssignment';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

export class BadgePaper extends Component {

  state = {
    open: false,
    settingsOpen: false,
    assignmentOpen: false,
    badge: null
  }

  componentDidUpdate() {
    if(this.state.open === true){
      this.setState({ open: false });
    }
    if(this.state.settingsOpen === true){
      this.setState({ settingsOpen: false });
    }
    if(this.state.assignmentOpen === true){
      this.setState({ assignmentOpen: false });
    }
  }

  badgeDetails = (badge) => {
    this.setState({ open: true, badge: badge });
  }

  badgeSettings = (badge) => {
    this.setState({ settingsOpen: true, badge: badge });
  }

  badgeAssignment = (badge) => {
    this.setState({ assignmentOpen: true, badge: badge });
  }

  render(){
    const badge = this.props.content
    return(
      <Grid item xs={12} sm={6} md={4}>
        <BadgeDetails open={this.state.open} badge={this.state.badge}/>
        <BadgeSettings open={this.state.settingsOpen} badge={this.state.badge}/>
        <BadgeAssignment open={this.state.assignmentOpen} badge={this.state.badge}/>
        <Paper style={{margin: '4px', cursor: 'pointer', textAlign: 'center'}}>
          <div onClick={() => {this.badgeDetails(badge)}}>
            {badge.image && badge.image.path ?
              <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
            : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
          </div>
          <Typography variant='h6' style={{display: 'flex', cursor: 'default', paddingBottom: '6px'}}>
            <div style={{flexGrow:1, marginLeft: '10px'}}>{badge.name}</div>
            {this.props.user && this.props.settings ?
              badge.issuer.map(issuer => issuer._id).indexOf(this.props.user._id) > -1 ?
                badge.issuer[0]._id === this.props.user._id ?
                  <div>
                    <Tooltip title="Badge vergeben">
                      <IconButton onClick={() => {this.badgeAssignment(badge)}} style={{padding: 0, marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Badge verwalten">
                      <Badge color="secondary" badgeContent={badge.request.length} style={{marginRight: '10px'}}>
                        <IconButton onClick={() => {this.badgeSettings(badge)}} style={{padding: 0}}>
                          <FontAwesomeIcon icon={faCog}/>
                        </IconButton>
                      </Badge>
                    </Tooltip>
                  </div>
                : <Tooltip title="Badge vergeben">
                    <IconButton onClick={() => {this.badgeAssignment(badge)}} style={{padding: 0, marginRight: '5px'}}>
                      <FontAwesomeIcon icon={faUserPlus}/>
                    </IconButton>
                  </Tooltip>
              : badge.request.map(issuer => issuer._id).indexOf(this.props.user._id) > -1 ?
                <Tooltip title="Anfrage läuft">
                  <IconButton style={{padding: 0, marginRight: '10px', cursor: 'default'}}>
                    <CircularProgress size={24}/>
                  </IconButton>
                </Tooltip>
                : <Tooltip title="Badge-Issuer werden">
                    <IconButton onClick={() => this.props.requestBadgePermission(badge._id)} style={{padding: 0, marginRight: '10px'}}>
                      <FontAwesomeIcon icon={faPlus}/>
                    </IconButton>
                  </Tooltip>
              : null}
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

BadgePaper.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object.isRequired,
  requestBadgePermission: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  message: state.message
});

export default connect(mapStateToProps, { requestBadgePermission })(BadgePaper);
