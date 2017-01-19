import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Login from './Login';

// Styles
import styles from './Styles/SceneStyle';

export default class PresentationScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>

        <Image
          source={Images.background5}
          style={styles.backgroundImage}
          resizeMode="stretch" />

        <View style={styles.mainSection}>

          <ScrollView style={styles.scrollContainer}>

          </ScrollView>

          <View>

            <Login />

          </View>

        </View>

      </View>
    );
  }
}
