import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    console.log(this)
    console.log(props)
    this.state = {
      dob: this.props.dob,
      prov: (typeof this.props.prov === 'string') ? this.props.prov : '––'
    }
  }

  handleChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (typeof this.state !== 'object') this.state = {};
    console.log(this)
    return (
      <form>
        <label htmlFor="dob">
          <FormattedMessage id="dob" defaultMessage={`Date of Birth:`} />
        </label>
        <input name="dob" type="date" defaultValue={this.state.dob} value={this.state.value} max={global.util.dateToIetfDate(new Date())} onChange={this.handleChange} />
        <label htmlFor="prov">
          <FormattedMessage id="prov" defaultMessage={`Province:`} />
        </label>
        <select name="prov" defaultValue={this.state.prov} value={this.state.value} onChange={this.handleChange} >
          <option value="––" disabled>––</option>
          <option value="ab">AB</option>
          <option value="bc">BC</option>
          <option value="mb">MB</option>
          <option value="nb">NB</option>
          <option value="nl">NL</option>
          <option value="ns">NS</option>
          <option value="nt">NT</option>
          <option value="nu">NU</option>
          <option value="on">ON</option>
          <option value="pe">PE</option>
          <option value="qc">QC</option>
          <option value="sk">SK</option>
          <option value="yt">YT</option>
        </select>
      </form>
    );
  }
}

