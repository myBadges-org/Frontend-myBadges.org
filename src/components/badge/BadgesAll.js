import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBadges } from '../../actions/badgeActions';

import Badges from './Badges';
import CreateBadge from './CreateBadge';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

export class BadgesAll extends Component {

  state = {
    open: false,
    msg: null,
    msgType: null
  }

  componentDidMount(){
    this.props.getBadges();
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.open === true){
      this.setState({ open: false });
    }
    const { message } = this.props;
    if (message !== previousProps.message) {
      // Check for error
      if(message.id === 'GET_BADGES_FAIL'){
        this.setState({msg: message.msg, msgType: 'error'});
      }
      else {
        this.setState({msg: null});
      }
    }
  }

  render(){
    return(
      <div>
        {this.props.isLoading ? <LinearProgress /> : null}
        <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          {this.state.msg ? <Alert style={{marginBottom: '10px'}} icon={false} severity={this.state.msgType}>{this.state.msg}</Alert> : null}
          {this.props.user && this.props.user.role[0] ?
            <Button variant="contained" color="primary" onClick={() => this.setState({ open: true })} style={{marginBottom: '30px'}}>
              Neuer Badge
              <CreateBadge open={this.state.open} admin={this.props.user.role[0] === 'admin'}/>
            </Button>
          : null}
          {!this.props.isLoading && this.props.badges ?
            <Badges badges={this.props.badges} settings/>
          : null}
        </div>
      </div>
    );
  }
}

BadgesAll.propTypes = {
  user: PropTypes.object,
  badges: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getBadges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  badges: state.badge.badges,
  isLoading: state.badge.isLoading,
  message: state.message
});


export default connect(mapStateToProps, { getBadges })(BadgesAll);
