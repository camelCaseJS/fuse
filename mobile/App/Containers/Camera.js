import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/PresentationScreenStyle';

class Camera extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Take Photo
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Camera;
