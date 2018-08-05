import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerLocation } from '@reach/router';
import serialize from 'serialize-javascript';

import configureStore from '../common/configureStore';
import Root from '../common/app';
// Import Language Provider
import LanguageProvider from '../common/containers/LanguageProvider';

// Import i18n messages
import { translationMessages } from '../common/i18n';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // Create a new Redux store instance

    const store = configureStore()

    // Render the component to a string
    const markup = renderToString(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ServerLocation url={req.url}>
            <Root />
          </ServerLocation>
        </LanguageProvider>
      </Provider>
    )

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle Redux Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
  assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''
}
          ${
  process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`
}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`)
  })

export default server
