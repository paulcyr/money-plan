import React, { Component } from 'react';
import PersonalInformationForm from '../../components/PersonalInfoForm';
import BalancesForm from '../../components/BalancesForm';

export default class Settings extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="settings">
        <PersonalInformationForm dob={this.props.settings.get('dob')}/>
        <BalancesForm />
      </div>
    );
  }
}