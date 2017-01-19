import React, { Component } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import Login from './Login';

// Styles
import styles from './Styles/SceneStyle';

class PresentationScreen extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>

        <Image
          source={Images.background5}
          style={styles.backgroundImage}
          resizeMode="stretch" />

        <View style={styles.mainSection}>

          <ScrollView style={styles.scrollContainer}>

          <RoundedButton onPress={NavigationActions.friends}>
            Friends
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.camera}>
            Camera
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.search}>
            Search
          </RoundedButton>

          </ScrollView>

          <View>

            <Login />

          </View>

        </View>

      </View>
    );
  }
}

export default PresentationScreen;
