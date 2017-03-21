import React, { Component } from 'react';
import PersonalInformationForm, {BalancesForm} from '../../components/forms';

class Settings extends Component {
  render() {
    return (
      <div className="settings">
        <PersonalInformationForm />
        <BalancesForm />
      </div>
    );
  }
}

export default Settings;
