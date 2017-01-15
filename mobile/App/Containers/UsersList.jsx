import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

// const styles = { list:
//   { margin: 10 },
// };

const dataObjects = [
  { id: 1,
    firstName: 'Philip',
    lastName: 'Fry',
    profilePictureURL: 'http://vignette2.wikia.nocookie.net/en.futurama/images/d/da/Fry_Looking_Squint.jpg',
  },
  { id: 2,
    firstName: 'Bender',
    lastName: 'Rodriguez',
    profilePictureURL: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png',
  },
  { id: 3,
    firstName: 'Prof',
    lastName: 'Fransworth',
    profilePictureURL: 'http://orig04.deviantart.net/a01d/f/2015/099/8/0/farnsworth_first_draw_by_luigibroz-d8p0tzz.png',
  },
];

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: dataObjects,
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
