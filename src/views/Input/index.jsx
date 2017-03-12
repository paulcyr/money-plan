import React, { Component } from 'react';
import PersonalInfoForm from '../../components/forms';

class Input extends Component {
  render() {
    return (<div className="input" />);
  }

  personalInfo() {
    return (
      <PersonalInfoForm />
    )
  }
}

export default Input;
