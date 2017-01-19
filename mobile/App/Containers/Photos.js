import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/ThemeScreenStyle';

// const images = ['http://localhost:8000/api/photos/3/yes.jpg', 'http://localhost:8000/api/photos/3/no.jpg', 'http://localhost:8000/api/photos/3/vov.jpg'];
const images = [];
const userName = 'Will Powelson';

class Photos extends Component {

  renderPhoto (url) {
    return (
      <View style={styles.colorContainer} key={`${url}Container`}>
        <View style={styles.backgroundContainer} key={`${url}BackgroundContainer`}>
          <Image style={styles.backerImage} source={{uri: url}} key={`${url}BackgroundImage`} />
          <View style={[styles.colorSquare]} key={`${url}Square`} />
        </View>
      </View>
    )  
  }

  renderPhotos () {
    return images.map((url) => this.renderPhoto(url))
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style = {styles.section}>
            <Text style={styles.sectionText}>{userName}'s Photos</Text>
          </View>
          <View style={styles.colorsContainer} >
            {(images.length) ? (
            <View style={styles.colorsContainer} >
              {this.renderPhotos()}
             </View>
            )
            : (
            <View style={styles.colorsContainer} >
              <Text style={styles.sectionText}>This person hasn't shared any photos with you yet!</Text>
             </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Photos;
