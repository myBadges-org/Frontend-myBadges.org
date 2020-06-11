import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

class Principles extends Component {
  render() {
    return (
      <Grid item xs={12} sm={6} md={4} style={{textAlign: 'center'}}>
        <img src={this.props.icon} width='60' height='60' alt={this.props.title}/>
        <h4 style={{margin:'0 0 5px 0'}}>{this.props.title}</h4>
        {this.props.content}
      </Grid>
    );
  };
}

export default Principles;
