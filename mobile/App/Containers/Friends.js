import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';
import { Images, Colors, Fonts, Metrics } from '../Themes';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  constructor(props){
    super(props);
    this.renderRightElement = this.renderRightElement.bind(this);
    this.onPendingDeny = this.onPendingDeny.bind(this);
    this.onPendingApprove = this.onPendingApprove.bind(this);
  }

  componentWillMount() {
    authenicate();
  }

  onFriendSelect(friend, index) {
    this.props.unselectAllFriends();
    this.props.selectFriend(friend, index);
    this.props.fetchPhotos(friend);
    NavigationActions.photos();
  }

  onPendingApprove(user, index) {
    console.log('pending approval', user);
    this.props.completeFriendRequest(user.id);
  }

  onPendingDeny(user, index) {
    console.log('pending deny');
    this.props.destroyFriendRequest(user.id);
    // this.props.fetchFriends();
  }

  onPendingSelect(user, index) {
    this.props.completeFriendRequest(user.id);
  }

  onFriendsListMount() {
    this.props.fetchFriends();
  }

  onPendingListMount() {
    this.props.fetchPendingFriends();
  }

  handleChange(value) {
    this.props.fetchFriends();
    this.props.fetchPendingFriends();
    this.props.switchTab(value);
  }

  renderRightElement(user, index) {
     return (
      <View  style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=>{this.onPendingApprove(user)}}>
          <Icon
            color="#689F38"
            style={{margin: Metrics.smallMargin}}
            size={Metrics.icons.small}
            name="check"
          />
          </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.onPendingDeny(user)}}>
          <Icon
            color="#d32f2f"
            style={{margin: Metrics.smallMargin}}
            size={Metrics.icons.small}
            name="times"
          />
        </TouchableOpacity>
      </View>
    );
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

            <SwipeableViews
              index={this.props.tabIndex}
              onChangeIndex={(value) => { this.handleChange(value); }}
            >
              <ScrollView style={styles.scrollContainer}>
                <UsersList
                  value="friends"
                  onSelect={(user, index) => this.onFriendSelect(user, index)}
                  listComponentWillMount={() => this.onFriendsListMount()}
                  users={this.props.allFriends}
                />
              </ScrollView>
              <ScrollView style={styles.scrollContainer}>
                <UsersList
                  value="pending"
                  rightElement={this.renderRightElement}
                  onSelect={(user, index) => this.onPendingSelect(user, index)}
                  listComponentWillMount={() => this.onPendingListMount()}
                  users={this.props.pendingFriends}
                />
              </ScrollView>
          </SwipeableViews>
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
    pendingFriends: state.friends.pendingFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    tabIndex: state.friends.tabIndex,
  };
};

Friends.propTypes = {
  pendingFriends: PropTypes.array.isRequired,
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  fetchPendingFriends: PropTypes.func.isRequired,
  destroyFriendRequest: PropTypes.func.isRequired,
  completeFriendRequest: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, combinedActionCreators)(Friends);
