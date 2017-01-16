import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import UsersList from '../../../shared-components/users-list';
import * as friendsActionCreators from '../../../actions/friends-actions';
import * as photosActionCreators from '../../../actions/photos-actions';
// import { connectToFriendsNamespace, connectToPhotosNamespace } from '../../../sockets-client/sockets';
import { connectToNamespaces } from '../../../sockets-client/sockets';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

const emptyListMessage = () => (
  <p>Click the <Search /> to search for friends</p>
  );

class Friends extends Component {

  componentWillUpdate() {
    if (this.props.userInfo.user !== undefined) {
      const userFBId = this.props.userInfo.user.facebookId;
      // connectToPhotosNamespace(userFBId);
      // connectToFriendsNamespace(userFBId);
      connectToNamespaces(userFBId);
    }
  }
  // componentWillMount() {
  //   this.props.fetchFriends();
  //   this.props.getUserInfo();
  //   console.log('friends component mount');
  //   // console.log(this.props.userInfo, 'props inside of friendslist mount');
  // }

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

  onFriendsListMount() {
    this.props.fetchFriends();
    this.props.getUserInfo();
  }

  // connectToNsp(user) {
  //   connectToPhotosNamespace(user.facebookId);
  //   connectToFriendsNamespace(user.facebookId);
  // }

  render() {
    console.log(this.props.userInfo);
    return (
      <UsersList
        onSelect={(user, index) => this.onFriendSelect(user, index)}
        listComponentWillMount={() => this.onFriendsListMount()}
        users={this.props.allFriends}
        componentForEmptyList={<ListItem
          primaryText={emptyListMessage()}
          disabled={true}
        />}
      />
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

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.objectOf(PropTypes.string),
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object),
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
