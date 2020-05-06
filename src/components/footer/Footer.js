import React, { Component } from 'react';

import moment from 'moment';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

class Footer extends Component {
  render() {
    return (
      <footer style={{position:'absolute', bottom: '0', width: '100%'}}>
        <BottomNavigation
          showLabels={true}
          style={{height:'25px', backgroundColor:'lightgrey'}}
        >
          <div style={{flexGrow: 1, marginLeft: '24px', color: 'grey', marginTop: 'auto', marginBottom: 'auto'}}>
            © OpenBadges {moment().format('YYYY')}
          </div>
          <div style={{marginRight: '24px', marginTop: 'auto', marginBottom: 'auto'}}>
            <a href="https://github.com/Delucse" target="_blank" style={{textDecoration: 'none',  color: 'grey'}}>delucse</a>
          </div>
        </BottomNavigation>
      </footer>
    );
  };
}

export default Footer;
