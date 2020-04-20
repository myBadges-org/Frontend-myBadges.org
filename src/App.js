import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import Routes from './components/routes/Routes';


class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return(
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes />
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
