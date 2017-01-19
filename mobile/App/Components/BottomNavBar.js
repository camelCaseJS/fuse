import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '../Themes';
import styles from './Styles/BottomNavBarStyle';

export default class BottomNavBar extends Component {

  render() {
    const { onCenterIconPress, onLeftIconPress, onRightIconPress } = this.props;
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onLeftIconPress}>
          <Icon
            style={styles.centerIcon}
            name="home"
            size={Metrics.icons.medium}
            onPress={this.props.leftIconPress}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCenterIconPress}>
          <Icon
            style={styles.centerIcon}
            name="camera"
            size={Metrics.icons.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRightIconPress}>
          <Icon
            style={styles.centerIcon}
            name="search"
            size={Metrics.icons.medium}
            onPress={this.props.rightIconPress}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
