import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes'
import { connect } from 'react-redux';
import styles from './Styles/ThemeScreenStyle';
import URL from '../Config/URL';
import url from 'url';
import * as photoActionCreators from '../Actions/photos-actions';
import * as friendsActionCreators from '../Actions/FriendsActions';

class Photos extends Component {

  ComponentWillMount() {
    this.props.fetchPhotos();
  }

  renderPhoto (url) {
    return (
      <View style={styles.photoContainer} key={`${url}Container`}>
        <View style={styles.backgroundContainer} key={`${url}BackgroundContainer`}>
          <Image style={styles.backerImage} source={{uri: url}} key={`${url}BackgroundImage`} />
          <View style={[styles.photoSquare]} key={`${url}Square`} />
        </View>
      </View>
    )  
  }

  renderPhotos () {
    return this.props.selectedUserPhotos.map((photo) => this.renderPhoto(photo.link)) 
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style = {styles.section}>
            {(this.props.lastSelectedFriend) ? 
              (<Text style={styles.sectionText}>{this.props.lastSelectedFriend.first} {this.props.lastSelectedFriend.last}'s Photos</Text>)
              :(<Text style={styles.sectionText}>Friend's Photos</Text>)             
            }
          </View>
          <View style={styles.photosContainer} >
            {(this.props.selectedUserPhotos && this.props.selectedUserPhotos.length) ? (
            <View style={styles.photosContainer} >
              {this.renderPhotos()}
             </View>
            )
            : (
            <View style={styles.photosContainer} >
              <Text style={styles.sectionText}>This person hasn't shared any photos with you yet!</Text>
             </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => (
  {
    selectedUserPhotos: state.photos.selectedUserPhotos,
    lastSelectedFriend: state.friends.lastSelectedFriend,
  }
);

Photos.propTypes = {
  selectedPhoto: React.PropTypes.object.isRequired,
  selectedUserPhotos: React.PropTypes.array.isRequired,
  selectPhoto: React.PropTypes.func.isRequired,
  fetchPhotos: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendsActionCreators, photoActionCreators)(Photos);
