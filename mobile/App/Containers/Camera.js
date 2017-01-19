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
import * as Animatable from 'react-native-animatable';
import RoundedButton from '../Components/RoundedButton';

class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      statusMessage: 'Take a Photo',
    };
  }

  // KEEP THIS, example code to check if users is logged in and if not, direct to main scene
  componentWillMount() {
    console.log('componentWilLMount');
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
    const body = new FormData();
    body.append('image', this.state.file);
    body.append('friends', this.props.selectedFriends);
    fetch(URL.photos, {
      method: 'POST',
      body,
    })
    .then((res) => {
      this.setState({
        file: {},
        statusMessage: 'Sent!  Take Another',
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
          statusMessage: 'Select Friends',
        });
        this.props.unselectAllFriends();
      }
    });
  }

  leftIconPress() {
    this.props.unselectAllFriends();
    this.setState({
      file: {},
      statusMessage: 'Take a Photo',
    });
    NavigationActions.friends();
  }

  centerIconPress() {
    if (this.state.file.uri) {
      this.sendPhoto();
    } else {
      this.selectPhoto();
    }
  }

  rightIconPress() {
    this.props.unselectAllFriends();
    this.setState({
      file: {},
      statusMessage: 'Take a Photo',
    });
    NavigationActions.search();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background5} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.mainSection}>
          <ScrollView style={styles.scrollContainer}>
            <Animatable.Text
              style={styles.sectionText}
              ref="text"
            >
              {this.state.statusMessage}
            </Animatable.Text>
            <UsersList
              onSelect={(user, index) => this.onFriendSelect(user, index)}
              listComponentWillMount={() => this.onFriendsListMount()}
              // If no photo taken, display empty array in place of friends
              users={this.state.file.uri ? this.props.allFriends : []}
            />
          </ScrollView>
          { (this.props.selectedFriends && this.props.selectedFriends.length > 0 && this.state.file.uri) ?
            <RoundedButton
              onPress={() => { this.sendPhoto(); }}
            >
              Send
            </RoundedButton> : [] }
        </View>
        <BottomNavBar
          onLeftIconPress={() => this.leftIconPress()}
          onCenterIconPress={() => this.centerIconPress()}
          onRightIconPress={() => this.rightIconPress()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, action) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    selectedFriends:
      state.friends.allFriends.reduce((accumulator, currentFriend) => {
        if (currentFriend.selected === true) {
          return accumulator.concat([currentFriend.id]);
        }
        return accumulator;
      }, []),
  };
};

Camera.propTypes = {
  allFriends: PropTypes.array.isRequired,
  selectedFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  // fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendsActionCreators)(Camera);
