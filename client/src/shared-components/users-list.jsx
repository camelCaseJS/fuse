import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

class UsersList extends Component {

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
};

export default connect(mapStateToProps)(UsersList);
