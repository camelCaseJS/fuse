import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/PresentationScreenStyle';
import UsersList from './UsersList';


class Friends extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <UsersList />
        </ScrollView>
      </View>
    );
  }
}

export default Friends;
