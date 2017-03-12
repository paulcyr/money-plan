import React, { Component } from 'react';
import Settings from '../Settings';
import Input from '../Input';
import Output from '../Output';

class Main extends Component {
  render() {
    return (
      <main id="main" role="main">
        <Settings />
        <Input />
        <Output />
      </main>
    );
  }
}

export default Main;
