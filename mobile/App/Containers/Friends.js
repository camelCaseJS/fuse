import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes';
import styles from './Styles/SceneStyle';
import UsersList from './UsersList';
import * as friendsActionCreators from '../Actions/FriendsActions';
import * as photosActionCreators from '../Actions/PhotosActions';
import authenicate from '../Components/Authenicate';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

class Friends extends Component {

  componentWillMount() {
    authenicate();
  }

  onFriendSelect(friend, index) {
    this.props.unselectAllFriends();
    this.props.selectFriend(friend, index);
    this.props.fetchPhotos(friend);
    NavigationActions.photos();
  }

  onFriendsListMount() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background5} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.mainSection}>
          <ScrollView style={styles.scrollContainer}>
          <UsersList
            onSelect={(user, index) => this.onFriendSelect(user, index)}
            listComponentWillMount={() => this.onFriendsListMount()}
            users={this.props.allFriends}
          />
        </ScrollView>
      </View>
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

Friends.propTypes = {
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, combinedActionCreators)(Friends);
