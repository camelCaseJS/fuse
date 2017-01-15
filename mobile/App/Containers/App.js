import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { ThemeProvider } from 'react-native-material-ui';
import RootContainer from './RootContainer';
import reducers from './RootReducer';

const createStoreWithMiddleware = applyMiddleware(
  promise,
)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <ThemeProvider>
          <RootContainer />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
