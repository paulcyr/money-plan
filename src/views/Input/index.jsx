import React, { Component } from 'react';
import PersonalInfoForm from '../../components/PersonalInfoForm';

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
