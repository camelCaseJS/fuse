import React, { Component } from 'react'
import { View, Image, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { Images, Colors } from '../Themes'
import Styles from './Styles/CustomNavBarStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions } from 'react-native-router-flux';
import * as friendsActionCreators from '../Actions/FriendsActions';

class NavBar extends Component {

  backButtonPress() {
    console.log('back!!!');
    this.props.unselectAllFriends();
    NavigationActions.pop();
  }

  render() {
    return (
      <Animated.View style={Styles.container}>
        <TouchableOpacity style={Styles.leftButton} onPress={() => {this.backButtonPress()}}>
          <Icon name='ios-arrow-back' size={34} color={Colors.snow} />
        </TouchableOpacity>
        <Image style={Styles.logo} source={Images.clearLogo} />
        <View style={Styles.rightButton} />
      </Animated.View>
    );
  }
}

export default connect(null, friendsActionCreators)(NavBar);