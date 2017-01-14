import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';
import * as friendsActionCreators from '../actions/friends-actions';
import * as photosActionCreators from '../actions/photos-actions';
import { connectToFriendsNamespace, connectToPhotosNamespace } from '../sockets-client/sockets';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.onSocketClick = this.onSocketClick.bind(this);
  }
  componentWillMount() {
    this.props.fetchFriends();
    this.props.getUserInfo();
  }

  onSocketClick() {
    // console.log('button working!');
    // console.log(this, 'on socket click');
    this.props.getUserInfo();
    // console.log(this.props);
    connectToPhotosNamespace(this.props.userInfo.user.facebookId);
    connectToFriendsNamespace(this.props.userInfo.user.facebookId);
  }

  onSelect(friend, index) {
    if (this.props.router.pathname !== '/camera') {
      this.props.unselectAllFriends();
      this.props.selectFriend(friend, index);
      this.props.fetchPhotos(friend);
      this.context.router.push('/photos');
    } else {
      this.props.selectFriend(friend, index);
    }
  }

  listIt() {
    const onSelect = this.onSelect.bind(this);
    if (this.props.allFriends.length === 0)
    return this.props.allFriends.map((friend, index) => {
      return (
        <UsersListEntry
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          profilePictureURL={friend.profilePictureURL}
          selected={friend.selected}
          onSelect={() => onSelect(friend, index)}
        />
      );
    },
    );
  }

  render() {
    return (
      <div>
        <List>
          {this.listIt()}
        </List>
        <button onClick={this.onSocketClick}>
        SOCKET TIME YEE
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    userInfo: state.friends.userInfo,
    router: state.router,
  };
};

FriendsList.contextTypes = {
  router: PropTypes.object };

FriendsList.propTypes = {
  fetchPhotos: React.PropTypes.func.isRequired,
  unselectAllFriends: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  // allFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  lastSelectedFriend: React.PropTypes.object.isRequired,
  fetchFriends: React.PropTypes.func.isRequired,
  selectFriend: React.PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,

};

export default connect(mapStateToProps, combinedActionCreators)(FriendsList);
