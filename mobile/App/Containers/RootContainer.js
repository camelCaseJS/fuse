import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import NavigationRouter from '../Navigation/NavigationRouter';

// Styles
import styles from './Styles/RootContainerStyle';

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <NavigationRouter />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(),
});

export default connect(null, mapDispatchToProps)(RootContainer);
