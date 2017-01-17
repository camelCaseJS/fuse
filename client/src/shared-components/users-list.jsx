import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

const styles = { list:
  { margin: 10 },
};

class UsersList extends Component {

  componentWillMount() {
    this.props.listComponentWillMount();
  }

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  renderUserList() {
    const onSelect = this.onSelect.bind(this);
    // console.log(this.props.users, 'props');

    if (this.props.users.length === 0 && this.props.componentForEmptyList !== null) {
      return this.props.componentForEmptyList;
    }

    return this.props.users.map((user, index) =>
      (
        <UsersListEntry
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          profilePictureURL={user.profilePictureURL}
          selected={user.selected}
          onSelect={() => onSelect(user, index)}
        />
      ),
    );
  }

  render() {
    return (
      <List
        style={styles.list}
      >
        {this.renderUserList()}
      </List>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  listComponentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
  componentForEmptyList: PropTypes.object,
};

UsersList.defaultProps = {
  listComponentWillMount: () => {},
  onSelect: () => {},
  componentForEmptyList: null,
};

export default UsersList;
