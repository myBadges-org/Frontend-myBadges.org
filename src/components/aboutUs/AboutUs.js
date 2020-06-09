import React, { Component } from 'react';

class AboutUs extends Component {

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div style={{margin: '0px 24px 0px 24px'}}>
        <h1>Über uns</h1>
      </div>
    );
  };
}

export default AboutUs;
