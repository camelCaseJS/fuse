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

    return this.props.allFriends.map(friend => (
      <UsersListEntry
        key={friend.id}
        firstName={friend.firstName}
        lastName={friend.lastName}
        profilePictureURL={friend.profilePictureURL}
        onSelect={() => selectFriend(friend)}
      />
      ),
    );
  }

  render() {
    console.log(this.props.selectedFriends);
    return (
      <List>
        {this.listIt()}
      </List>
    );
  }
}

const mapStateToProps = state => (
  {
    allFriends: state.friends.allFriends,
    selectedFriends: state.friends.selectedFriends }
);

FriendsList.propTypes = {
  allFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectedFriends: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  fetchFriends: React.PropTypes.func.isRequired,
  selectFriend: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, friendActionCreators)(FriendsList);
