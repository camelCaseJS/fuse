import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import RootContainer from './root-container';
import reducers from './root-reducer';

const createStoreWithMiddleware = applyMiddleware(
  promise,
)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;