import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPanel } from '../../actions/helperActions';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from '@material-ui/core/Typography';

export class ProjectInfo extends Component {

  render(){
    return(
      <ExpansionPanel expanded={this.props.expanded === this.props.panel} onChange={() => this.props.setPanel(this.props.expanded)} style={{borderRadius: '4px'}}>
        <ExpansionPanelSummary
          expandIcon={
            <FontAwesomeIcon icon={faChevronDown} />
          }
        >
          <Typography><b>{this.props.title}</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{this.props.content}</Typography>
          {this.props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ProjectInfo.propTypes = {
  panel: PropTypes.string.isRequired,
  setPanel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  panel: state.helper.panel
});


export default connect(mapStateToProps, { setPanel })(ProjectInfo);
