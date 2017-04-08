import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class BalancesForm extends Component {
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
        <label htmlFor="tfsa">
          <FormattedMessage id="tfsa" defaultMessage={`TFSA`} />
        </label>
        <input name="tfsa" type="number" min="0" step="0.01" value={this.state.value} onChange={this.handleChange} />
        <label htmlFor="tfsa">
          <FormattedMessage id="tfsa" defaultMessage={`TFSA`} />
        </label>
        <input name="tfsa" type="number" min="0" step="0.01" value={this.state.value} onChange={this.handleChange} />
        <label htmlFor="tfsa">
          <FormattedMessage id="tfsa" defaultMessage={`TFSA`} />
        </label>
        <input name="tfsa" type="number" min="0" step="0.01" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}

class Account extends Component {
	
	constructor(prop) {
    super(prop);
	}
}