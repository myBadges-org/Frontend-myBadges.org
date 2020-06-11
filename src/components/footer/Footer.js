import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';

class Footer extends Component {
  render() {
    return (
      <footer style={{position:'absolute', bottom: '0', width: '100%'}}>
        <BottomNavigation
          showLabels={true}
          style={{height:'30px', backgroundColor:'#ffebce'}}
        >
          <div style={{color: 'grey', marginTop: 'auto', marginBottom: 'auto'}}>
            <Link to={"/imprint"} style={{textDecoration: 'none', color: 'inherit'}}>Impressum</Link>
            <text style={{margin: '0px 10px 0px 10px'}}>|</text>
            <Link to={"/aboutus"} style={{textDecoration: 'none', color: 'inherit'}}>Über uns</Link>
            <text style={{margin: '0px 10px 0px 10px'}}>|</text>
            <Link to={"/faq"} style={{textDecoration: 'none', color: 'inherit'}}>FAQ</Link>
          </div>
        </BottomNavigation>
      </footer>
    );
  };
}

export default Footer;
