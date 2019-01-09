import React, { Component } from 'react';
import './App.css';

import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';

function Welcome() {
  return (
    <NamespacesConsumer>
      {
        (t, { i18n }) => <h2>{t('title')}</h2>
      }
    </NamespacesConsumer>
  )
}

const MyComponent = ({ t }) => {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
};
const MyComponentWrapped = withNamespaces()(MyComponent);

class App extends Component {
  render() {
    const { t, i18n } = this.props;

    const changeLanguage = lng => {
      console.log('changing // lng:', lng)
      i18n.changeLanguage(lng);
    };

    return (
      <div className="App">
        <header className="App-header">
          <Welcome />
          <div>
            <button onClick={() => changeLanguage('de')}>de</button>
            <button onClick={() => changeLanguage('en')}>en</button>
          </div>
          <div>
            <MyComponentWrapped />
          </div>
          <div>{t('description.part2')}</div>
        </header>
      </div>
    );
  }
}

export default withNamespaces('translation')(App);
