import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Image, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { AccessToken } from 'react-native-fbsdk';
import { Images } from '../Themes';
import styles from './Styles/SceneStyle';
import URL from '../Config/URL';
import UsersList from './UsersList';
import BottomNavBar from '../Components/BottomNavBar';
import * as friendsActionCreators from '../Actions/FriendsActions';

const filterForSelectedFriendsID = (arrayOfFriends) => {
  return arrayOfFriends.reduce((accumulator, currentFriend) => {
    if (currentFriend.selected === true) {
      return accumulator.concat([currentFriend.id]);
    }
    return accumulator;
  }, []);
};

class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
    };
  }

  // KEEP THIS, example code to check if users is logged in and if not, direct to main scene
  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (data === null) {
          NavigationActions.presentationScreen();
        }
      });
  }

  onFriendSelect(friend, index) {
    console.log('friendselect');
    this.props.selectFriend(friend, index);
  }

  onFriendsListMount() {
    this.props.fetchFriends();
  }

  sendPhoto() {

    const selectedFriendsIDs = filterForSelectedFriendsID(this.props.allFriends);
    // console.log('messageBody in sendPhoto');
    // console.log(this.state.body);
    // const body = {...this.state.body};
    // console.log('body in send photo');
    // console.log(body);
    const body = new FormData();
    body.append('image', this.state.file);
    body.append('friends', selectedFriendsIDs);
    console.log('body before send');
    console.log(body);
    fetch(URL.photos, {
      method: 'POST',
      body,
    })
    .then((res) => {
      console.log('response to send');
      console.log(res);
      // TODO Delete File
      this.setState({
        file: {},
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  selectPhoto() {
    const options = {
      takePhotoButtonTitle: 'Capture Image',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        path: 'Photos',
      },
    };

    ImagePicker.showImagePicker(options, (response)=> {

      if (response.didCancel) {
        console.log('Cancel');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const splitter = response.uri.split('/');
        const name = (splitter.length) ? splitter[splitter.length -1] : null;
        this.setState({
          file: {
            uri: response.uri,
            type: 'image/jpeg',
            name,
          },
        });
      }
    });
  }

  cameraIconPress() {
    if (this.state.file.uri) {
      this.sendPhoto();
    } else {
      this.selectPhoto();
    }
  }

  render() {
      console.log('this.state.file');
      console.log(this.state.file);

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background5} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.mainSection}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.sectionText}>
              {this.state.file.uri ? 'Select Friends' : 'Take Photo'}
            </Text>
            <UsersList
              onSelect={(user, index) => this.onFriendSelect(user, index)}
              listComponentWillMount={() => this.onFriendsListMount()}
              users={this.props.allFriends}
          />
        </ScrollView>
        </View>
        <BottomNavBar
          onLeftIconPress={() => { NavigationActions.friends(); }}
          onCenterIconPress={() => this.cameraIconPress()}
          onRightIconPress={() => { NavigationActions.search(); }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, action) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
  };
};

Camera.propTypes = {
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  // fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendsActionCreators)(Camera);
