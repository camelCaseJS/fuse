import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

const styles = { list:
  { margin: 10 },
};

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
    };
  }

  componentWillMount() {
    this.props.componentWillMount();
  }

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  renderUserList() {
    if (this.state.users.length === 0 && this.props.componentForEmptyList !== null) {
      return this.props.componentForEmptyList;
    }

    const onSelect = this.onSelect.bind(this);

    return this.state.users.map((user, index) =>
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
  componentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
  componentForEmptyList: PropTypes.object,
};

UsersList.defaultProps = {
  ComponentWillMount: () => {},
  onSelect: () => {},
  componentForEmptyList: null,
};

export default UsersList;
