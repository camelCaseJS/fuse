import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/PresentationScreenStyle';
import UsersList from './UsersList';


class FriendsList extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <UsersList />
      </View>
    );
  }
}

export default FriendsList;
