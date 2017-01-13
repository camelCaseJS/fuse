import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersList from '../../../shared-components/users-list';
import * as friendsActionCreators from '../../../actions/friends-actions';
import * as photosActionCreators from '../../../actions/photos-actions';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

class Friends extends Component {

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
  }

  render() {
    return (
      <UsersList
        onSelect={() => this.onFriendSelect}
        componentWillMount={() => this.onFriendsListMount}
        users={this.props.allFriends}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    router: state.router,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.array, PropTypes.object),
  router: PropTypes.object,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
