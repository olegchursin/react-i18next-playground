import React, { Component } from 'react';
import './App.css';

import i18n from './i18n';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{i18n.t('Welcome')}</h1>
          <div>
            <ul>
              <li>{i18n.t('name.label')}</li>
              <li>{i18n.t('age.label')}</li>
              <li>{i18n.t('home.label')}</li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
