/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';

import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';

import { I18nextProvider } from 'react-i18next'; // has no proper import yet
import Backend from 'i18next-node-fs-backend';
import App from './App';
import i18n from './i18n';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

const i18nextMiddleware = require('i18next-express-middleware');

const server = express();

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      preload: ['en', 'de'],
      backend: {
        loadPath: `${appSrc}/locales/{{lng}}/{{ns}}.json`,
        addPath: `${appSrc}/locales/{{lng}}/{{ns}}.missing.json`,
      },
    },
    () => {
      server
        .disable('x-powered-by')
        .use(i18nextMiddleware.handle(i18n))
        .use('/locales', express.static(`${appSrc}/locales`))
        .use(express.static(path.join(__dirname, '../public')))
        .get('/*', (req, res) => {
          const context = {};
          const markup = renderToString(
            <I18nextProvider i18n={req.i18n}>
              <StaticRouter context={context} location={req.url}>
                <App />
              </StaticRouter>
            </I18nextProvider>
          );
          // This line must be placed after renderToString method
          // otherwise context won't be populated by App
          const { url } = context;
          if (url) {
            res.redirect(url);
          } else {
            const initialI18nStore = {};
            req.i18n.languages.forEach(l => {
              initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
            });
            const initialLanguage = req.i18n.language;

            res.status(200).send(
                express.static(path.join(__dirname, '/build/'))
            );
          }
        });
    }
  );

export default server;