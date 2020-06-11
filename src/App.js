import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import Routes from './components/routes/Routes';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#880e4f'
    }
  },
  shape: {
    borderRadius: '0.75rem',
  },
  typography: {
    fontFamily: [
      '"Nunito"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="wrapper">
              <Navbar />
              <Routes />
              <Footer />
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
