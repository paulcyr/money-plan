import React, { Component } from 'react';
import Settings from '../Settings';
import Input from '../Input';
import Output from '../Output';

class Main extends Component {
  render() {
    console.log(this.props)
    return (
      <main id="main" role="main">
        <Settings settings={this.props.data.settings} />
        <Input />
        <Output />
      </main>
    );
  }
}

export default Main;
