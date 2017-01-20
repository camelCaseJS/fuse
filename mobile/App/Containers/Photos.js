import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import url from 'url';
import { connect } from 'react-redux';
import { Images } from '../Themes';
import styles from './Styles/ThemeScreenStyle';
import * as photosActionCreators from '../Actions/PhotosActions';
import * as friendsActionCreators from '../Actions/FriendsActions';
import authenicate from '../Components/Authenicate';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

class Photos extends Component {

  componentWillMount() {
    authenicate();
  }

  renderPhoto (uri) {
    console.log('uri', uri);
    return (
      <View style={styles.photoContainer} key={`${uri}Container`}>
        <View style={styles.backgroundContainer} key={`${uri}BackgroundContainer`}>
          <Image style={styles.backerImage} source={{uri: uri}} key={`${uri}BackgroundImage`} />
          <View style={[styles.photoSquare]} key={`${uri}Square`} />
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

        <Image source={Images.background5} style={styles.backgroundImage} resizeMode="stretch" />


          <ScrollView style={styles.scrollContainer}>

            {(this.props.lastSelectedFriend) ?
              (<Text style={styles.sectionText}>{this.props.lastSelectedFriend.firstName} {this.props.lastSelectedFriend.lastName}'s Photos</Text>)
              :(<Text style={styles.sectionText}>Friend's Photos</Text>)
            }

            <View style={styles.photosContainer} >

              {(this.props.selectedUserPhotos && this.props.selectedUserPhotos.length) ? (
                <View style={styles.photosContainer} >
                  {this.renderPhotos()}
                </View>
                ) : (
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
    selectedPhoto: state.photos.selectedPhoto,
    selectedUserPhotos: state.photos.selectedUserPhotos,
    lastSelectedFriend: state.friends.lastSelectedFriend,
  }
);

Photos.propTypes = {
  selectedPhoto: PropTypes.object.isRequired,
  selectedUserPhotos: PropTypes.array.isRequired,
  selectPhoto: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, combinedActionCreators)(Photos);
