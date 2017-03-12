import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import App from './App';
import './index.css';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

global.util = require('another-util');

class Root extends Component {

  constructor() {
    super();
    this.state = {
      usersLocale: navigator.language || navigator.userLanguage,
      //translations: null,
    };
    addLocaleData([...en, ...fr]);
  }

  render() {
    let children;

        //if (this.state.translations) {
            children = (
                <IntlProvider
                  defaultLocale="en-CA"
                  locale="en-CA"//{this.state.usersLocale}
                  messages={this.state.translations}
                >
                  <App/>
                </IntlProvider>
            );
        //}

        return <div>{children}</div>;
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('mt')
);