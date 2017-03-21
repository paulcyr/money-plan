import React, { Component } from 'react';
import logo from './views/logo.svg';
import './index.css';
import Header from './views/Header';
import Main from './views/Main';
import Footer from './views/Footer';

require('./baseData');
require('./defaultValues');
require('./calc');
require('./main');

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
