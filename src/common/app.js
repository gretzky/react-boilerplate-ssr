/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import { Router } from '@reach/router';

// Import root app
import App from './containers/App';
import Home from './containers/HomePage';
import Feature from './containers/FeaturePage';

// Import CSS reset and Global Styles
import './global-styles';

const Root = () => (
  <Router>
    <App path='/'>
      <Home path='/' />
      <Feature path='features' />
    </App>
  </Router>
)

export default Root
