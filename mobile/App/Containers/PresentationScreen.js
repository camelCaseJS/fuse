import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Login from '../Components/Login';

// Styles
import styles from './Styles/PresentationScreenStyle';

export default class PresentationScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <RoundedButton onPress={NavigationActions.friends}>
            Friends
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.camera}>
            Camera
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.photos}>
            Photos
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.search}>
            Search
          </RoundedButton>

          <View style={styles.loginButton}>

            <Login />

          </View>

        </ScrollView>
      </View>
    );
  }
}
