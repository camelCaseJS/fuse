// GOIN TO THE REACT STo'

import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import reducers from './root-reducer';

const createStoreWithMiddleware = applyMiddleware(
  promise,
)(createStore);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider >
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.root'));
