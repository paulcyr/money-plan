import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import './index.css';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Header from './views/Header';
import Main from './views/Main';
import Footer from './views/Footer';

global.util = require('another-util');
require('./inc/app');

class App extends Component {

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
                <div>
                  <Header />
                  <Main data={window.app.data} />
                  <Footer />
                </div>
              </IntlProvider>
          );
      //}

      return <div>{children}</div>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('mt')
);