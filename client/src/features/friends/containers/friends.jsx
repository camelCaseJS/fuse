import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import FlatButton from 'material-ui/FlatButton';



import UsersList from '../../../shared-components/users-list';
import PendingList from '../../../shared-components/pending-list';

import * as friendsActionCreators from '../../../actions/friends-actions';
import * as photosActionCreators from '../../../actions/photos-actions';
import * as userActionCreators from '../../../actions/user-actions'


const combinedActionCreators = {
  ...photosActionCreators,
  ...friendsActionCreators,
  ...userActionCreators,
};

const emptyListMessage = () => (
  <p>Click the <Search /> to search for friends</p>
  );

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  inkBarStyle: {
    background: '#FFFFFF',
  },
};

class Friends extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clearSentPending = this.clearSentPending.bind(this);
    this.clearReceivedPending = this.clearReceivedPending.bind(this);
    this.clearFriendships = this.clearFriendships.bind(this);
  }

  componentWillMount() {
    const myFriendsSocket = io('/friendSocket');
    this.props.fetchFriends();
    this.props.fetchPendingFriends();

    this.props.getUserInfo()
    .then((userInfo) => {
      const userFBId = userInfo.payload.user.facebookId;
      myFriendsSocket.emit('join friend room', { roomId: userFBId });
    });

    myFriendsSocket.on('friend room connected', (friendRoomInfo) => {
      console.log(friendRoomInfo);
    });

    myFriendsSocket.on('new friend request', (newFriendSignal) => {
      alert(newFriendSignal);
      this.props.fetchPendingFriends();
    });
  }


  onFriendSelect(friend, index) {
    if (this.props.router.pathname !== '/camera') {
      this.props.unselectAllFriends();
      this.props.selectFriend(friend, index);
      this.props.fetchPhotos(friend);
      this.context.router.push('/photos');
    } else {
      this.props.selectFriend(friend, index);
    }
  }

  componentDidReceiveProps() {
    console.log('updating inside friends');
  }

  handleChange(value) {
    // console.log(value);
    this.props.handleTabSwitch(value);
  }

  clearSentPending() {
    this.props.destroySentPending();
  }

  clearReceivedPending() {
    this.props.destroyReceivedPending();
  }

  clearFriendships() {
    this.props.destroyFriendships();
  }

  render() {
    // console.log(this.props.destroyOneFriendRequest);
    return (
      <div>
        <Tabs
          inkBarStyle={{ background: '#DB0B00' }}
          tabItemContainerStyle={{ backgroundColor: '#666C7F' }}
          onChange={this.handleChange}
          value={this.props.slideIndex}
        >
          <Tab label="Friends" value={0} className="friends"/>
          <Tab label="Requests" value={1} className="requests" />
        </Tabs>
        <SwipeableViews
          index={this.props.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <UsersList
              className="userList"
              style={styles}
              onSelect={(pending, index) => this.onFriendSelect(pending, index)}
              users={this.props.allFriends}
              componentForEmptyList={<ListItem
                primaryText={emptyListMessage()}
                disabled={true}
              />}
            />
          </div>
          <div>
            <FlatButton className="clearFriends" onClick={this.clearFriendships} label="clear friends"/>
            <FlatButton className="clearPending" onClick={this.clearSentPending} label="clear sent pending"/>
            <FlatButton className="clearReceived" onClick={this.clearReceivedPending} label="clear received pending" />
            <PendingList
              className="pendingFriendList"
              style={styles}
              refreshPending={this.props.fetchPendingFriends}
              pendingFriends={this.props.pendingFriends}
              deleteRequest={this.props.destroyOneFriendRequest}
              completeRequest={this.props.completeOneFriendRequest}
              componentForEmptyList={<ListItem
                primaryText={emptyListMessage()}
                disabled={true}
              />}
            />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    pendingFriends: state.friends.pendingFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    userInfo: state.friends.userInfo,
    slideIndex: state.friends.slideIndex,
    router: state.router,
    destroyFriendships: state.friends.destroyFriendships,
    destroyPending: state.friends.destroyPending,
    destroyOneFriendship: state.friends.destroyOneFriendship,
    getUserInfo: state.user.getUserInfo,
    destroyOneFriendRequest: state.friends.destroyOneFriendRequest,
    completeOneFriendRequest: state.friends.completeOneFriendRequest,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
  pendingFriends: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.objectOf(PropTypes.string),
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  fetchPendingFriends: PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  handleTabSwitch: React.PropTypes.func.isRequired,
  slideIndex: React.PropTypes.number.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object),
  destroySentPending: React.PropTypes.func.isRequired,
  destroyReceivedPending: React.PropTypes.func.isRequired,
  destroyFriendships: React.PropTypes.func.isRequired,
  destroyOneFriendRequest: React.PropTypes.func.isRequired,
  completeOneFriendRequest: React.PropTypes.func.isRequired,
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
