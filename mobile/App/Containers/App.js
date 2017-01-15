import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import RootContainer from './RootContainer';
import reducers from './RootReducer';

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
