import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';
import * as friendActionCreators from '../friends/actions/actions';

class FriendsList extends Component {

  componentWillMount() {
    this.props.fetchFriends();
    // console.log(this.props.currentRoute);
  }

  onSelect(friend, index) {
    this.props.selectFriend(friend, index);
    this.context.router.push('/photos');
  }

  listIt() {
    const onSelect = this.onSelect.bind(this);

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
      <List>
        {this.listIt()}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
    // currentRoute: state.router.location.pathname
  };
};

FriendsList.contextTypes = {
  router: PropTypes.object };

FriendsList.propTypes = {
  allFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  lastSelectedFriend: React.PropTypes.object.isRequired,
  fetchFriends: React.PropTypes.func.isRequired,
  selectFriend: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendActionCreators)(FriendsList);
