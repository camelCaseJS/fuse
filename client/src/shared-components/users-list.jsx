import React, { Component } from 'react';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: props.usersList,
    };
    this.listIt = this.listIt.bind(this);
  }

  listIt() {
    return this.state.usersList.map(user =>
       (
         <UsersListEntry
           key={user.profilePictureURL}
           firstName={user.firstName}
           lastName={user.lastName}
           profilePictureURL={user.profilePictureURL}
         />
      ),
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

UsersList.propTypes = {
  usersList: React.PropTypes.array.isRequired,
};

export default UsersList;
