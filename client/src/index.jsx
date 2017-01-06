// GOIN TO THE REACT STo'

import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './routes';
import reducers from './root-reducer';

const createStoreWithMiddleware = applyMiddleware(
  promise,
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <Router history={hashHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.root'));
