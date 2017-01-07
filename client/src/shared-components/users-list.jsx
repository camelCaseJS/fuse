import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';
import { fetchFriends } from '../friends/actions/actions';

class UsersList extends Component {

  componentWillMount() {
    this.props.fetchUsers();
  }

  listIt() {

    return this.props.users.map((user) => {
      return (
        <UsersListEntry
          key={user.profilePictureURL}
          firstName={user.firstName}
          lastName={user.lastName}
          profilePictureURL={user.profilePictureURL}
        />
      );
    });
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
  return { users: state.friends.all };
};

UsersList.propTypes = {
  users: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchUsers: fetchFriends })(UsersList);
