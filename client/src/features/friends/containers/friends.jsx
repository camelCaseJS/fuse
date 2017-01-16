import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import ActionFace from 'material-ui/svg-icons/action/face';
import UsersList from '../../../shared-components/users-list';
import * as friendsActionCreators from '../../../actions/friends-actions';
import * as photosActionCreators from '../../../actions/photos-actions';

const combinedActionCreators = {
  ...photosActionCreators, ...friendsActionCreators,
};

const emptyListMessage = () => (
  <p>Click the <ActionFace /> to search for friends</p>
  );

class Friends extends Component {
  // componentWillMount() {
  //   this.props.fetchFriends();
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
    // console.log(this.props.allFriends);
  }

  render() {
    console.log(this.props.allFriends);

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
  console.log(state, 'in mapStateToProps');
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    router: state.router,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.object,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

Friends.contextTypes = {
  router: PropTypes.object };

export default connect(mapStateToProps, combinedActionCreators)(Friends);
