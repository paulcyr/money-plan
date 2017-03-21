import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    let dob = (typeof this.props.dob === 'object' && this.props.dob instanceof 'Date')
      ? this.props.dob
      : new Date(
        (function () {
          return new Date()
        }())
        .setFullYear(
          (function () {return new Date()}())
          .getFullYear() - 25
      ));
    
    this.state = {
      dob: global.util.dateToIetfDate(dob),
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

export class BalancesForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    let inflation = (typeof this.props.dob === 'number')
      ? this.props.inflation
      : new Date(
        (function () {
          return new Date()
        }())
        .setFullYear(
          (function () {return new Date()}())
          .getFullYear() - 25
      ));
    
    this.state = {
      bank: (typeof this.props.bank === 'number') ? this.props.bank : 0,
      tfsa: (typeof this.props.bank === 'number') ? this.props.tfsa : 0,
      dcpp: (typeof this.props.bank === 'number') ? this.props.dcpp : 0,
      rrsp: (typeof this.props.bank === 'number') ? this.props.rrsp : 0,
      lira: (typeof this.props.bank === 'number') ? this.props.lira : 0,
      lif: (typeof this.props.bank === 'number') ? this.props.lif : 0, 
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
    
    return (
      <form>
        <label htmlFor="bank">
          <FormattedMessage id="bank" defaultMessage={`Bank (Savings)`} />
        </label>
        <input name="bank" type="number" min="0" step="0.01" value={this.state.value} onChange={this.handleChange} />
        <label htmlFor="tfsa">
          <FormattedMessage id="tfsa" defaultMessage={`TFSA`} />
        </label>
        <input name="tfsa" type="number" min="0" step="0.01" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}