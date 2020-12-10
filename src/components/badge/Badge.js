import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestBadgePermission, getBadge } from '../../actions/badgeActions';

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
    this.setState({ open: true });
    this.props.getBadge(badge);
  }

  badgeSettings = (badge) => {
    this.setState({ settingsOpen: true });
    this.props.getBadge(badge);
  }

  badgeAssignment = (badge) => {
    this.setState({ assignmentOpen: true });
    this.props.getBadge(badge);
  }

  render(){
    const badge = this.props.content
    var isIssuer, isMentor, isRequester, isNothing;
    if(this.props.user && this.props.settings){
      if(badge.issuer.map(issuer => issuer._id).indexOf(this.props.user._id) > -1){
        isIssuer = true; isMentor = false; isRequester = false; isNothing = false;
      }
      else if(badge.mentor.map(mentor => mentor._id).indexOf(this.props.user._id) > -1){
        isMentor = true; isIssuer = false; isRequester = false; isNothing = false;
      }
      else if(badge.requestor.map(requestor => requestor._id).indexOf(this.props.user._id) > -1){
        isRequester = true; isIssuer = false; isIssuer = false; isNothing = false;
      }
      else {
        isNothing = true; isIssuer = false; isMentor = false; isIssuer = false;
      }
    }

    return(
      <Grid item xs={12} sm={6} md={4}>
        <BadgeDetails open={this.state.open} isIssuer={isIssuer}/>
        <BadgeSettings open={this.state.settingsOpen}/>
        <BadgeAssignment open={this.state.assignmentOpen}/>
        <Paper style={{margin: '4px', cursor: 'pointer', textAlign: 'center'}}>
          <div onClick={() => {this.badgeDetails(badge)}}>
            {badge.image && badge.image.path ?
              <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
            : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>}
          </div>
          <Typography variant='h6' style={{display: 'flex', cursor: 'default', paddingBottom: '6px'}}>
            <div style={{flexGrow:1, marginLeft: '10px', marginRight: '10px'}}>{badge.name}</div>
            {isIssuer ?
              <div>
                <Tooltip title="Badge vergeben">
                  <IconButton onClick={() => {this.badgeAssignment(badge)}} style={{padding: 0, marginRight: '5px'}}>
                    <FontAwesomeIcon icon={faUserPlus}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Badge verwalten">
                  <Badge color="secondary" badgeContent={badge.requestor.length} style={{marginRight: '10px'}}>
                    <IconButton onClick={() => {this.badgeSettings(badge)}} style={{padding: 0}}>
                      <FontAwesomeIcon icon={faCog}/>
                    </IconButton>
                  </Badge>
                </Tooltip>
              </div> : null}
            {isMentor ?
              <Tooltip title="Badge vergeben">
                <IconButton onClick={() => {this.badgeAssignment(badge)}} style={{padding: 0, marginRight: '5px'}}>
                  <FontAwesomeIcon icon={faUserPlus}/>
                </IconButton>
              </Tooltip> : null}
            {isRequester ?
              <Tooltip title="Anfrage läuft">
                <IconButton style={{padding: 0, marginRight: '10px', cursor: 'default'}}>
                  <CircularProgress size={24}/>
                </IconButton>
              </Tooltip> : null}
            {isNothing ?
              <Tooltip title="Badge-Issuer werden">
                <IconButton onClick={() => this.props.requestBadgePermission(badge._id)} style={{padding: 0, marginRight: '10px'}}>
                  <FontAwesomeIcon icon={faPlus}/>
                </IconButton>
              </Tooltip> : null}
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

BadgePaper.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object.isRequired,
  badge: PropTypes.object,
  requestBadgePermission: PropTypes.func.isRequired,
  getBadge: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  message: state.message,
  badge: state.badge.badge
});

export default connect(mapStateToProps, { requestBadgePermission, getBadge })(BadgePaper);
