import React, { Component } from 'react';
import './App.css';

import i18n from './i18n';

class App extends Component {
  render() {
    const lng = 'es'

    return (
      <div className="App">
        <header className="App-header">
          <h1>{i18n.t('Welcome', {lng})}</h1>
          <div>
            <ul>
              <li>{i18n.t('name.label', {lng})}</li>
              <li>{i18n.t('age.label', {lng})}</li>
              <li>{i18n.t('home.label', {lng})}</li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
