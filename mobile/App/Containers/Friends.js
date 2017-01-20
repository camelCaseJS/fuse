import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';
import { Images, Colors, Fonts, Metrics } from '../Themes';
import styles from './Styles/SceneStyle';
import UsersList from './UsersList';
import * as friendsActionCreators from '../Actions/FriendsActions';
import * as photosActionCreators from '../Actions/PhotosActions';
import SwipeableViews from 'react-swipeable-views-native';
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

  handleChange(value) {
    this.props.switchTab(value);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background5}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <View style={styles.mainSection}>

          <ScrollView style={styles.scrollContainer}>
            <SwipeableViews
              index={this.props.tabIndex}
              onChangeIndex={(value) => { this.handleChange(value); }}
            >
              <UsersList
                onSelect={(user, index) => this.onFriendSelect(user, index)}
                listComponentWillMount={() => this.onFriendsListMount()}
                users={this.props.allFriends}
              />
              <View />
            </SwipeableViews>
          </ScrollView>
           <Tabs
            selected={this.props.tabIndex === 0 ? "friends" : "requests" }
            onSelect={el => this.handleChange(el.props.value)}
            style={styles.container}
            selectedStyle={styles.selectedText}
          >
            <Text
              name="friends"
              value={0}
              style={styles.sectionText}
            >
              Friends
            </Text>
            <Text
              name="requests"
              value={1}
              style={styles.sectionText}
            >
              Requests
            </Text>
          </Tabs>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, action) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    tabIndex: state.friends.tabIndex,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, combinedActionCreators)(Friends);
