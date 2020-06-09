import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';

class Footer extends Component {
  render() {
    return (
      <footer style={{position:'absolute', bottom: '0', width: '100%'}}>
        <BottomNavigation
          showLabels={true}
          style={{height:'30px', backgroundColor:'lightgrey'}}
        >
          <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Link to={"/imprint"} style={{textDecoration: 'none', color: 'grey'}}>Impressum</Link>
          </div>
        </BottomNavigation>
      </footer>
    );
  };
}

export default Footer;
