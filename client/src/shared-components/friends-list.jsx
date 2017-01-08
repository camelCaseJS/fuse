import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';
import * as friendActionCreators from '../friends/actions/actions';

class FriendsList extends Component {

  componentWillMount() {
    this.props.fetchFriends();
  }

  listIt() {
    const { selectFriend } = this.props;

    return this.props.allFriends.map((friend, index) => {
      return (
        <UsersListEntry
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          profilePictureURL={friend.profilePictureURL}
          selected={friend.selected}
          onSelect={() => selectFriend(friend, index)}
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
  console.log('state');
  console.log(state);
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend };
};

FriendsList.propTypes = {
  allFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  lastSelectedFriend: React.PropTypes.object.isRequired,
  fetchFriends: React.PropTypes.func.isRequired,
  selectFriend: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendActionCreators)(FriendsList);
