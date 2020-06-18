import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

class Principles extends Component {
  render() {
    return (
      <Grid item xs={12} sm={6} md={4} style={{textAlign: 'center'}}>
        <img src={this.props.icon} alt="" style={{maxHeight: '50px'}}/>
        <h4 style={{margin:'5px'}}>{this.props.title}</h4>
        {this.props.content}
      </Grid>
    );
  };
}

export default Principles;
