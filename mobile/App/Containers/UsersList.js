import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Avatar, ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';
// import UsersListEntry from './users-list-entry';

// Styles
import styles from './Styles/ListviewExampleStyle';

class UsersList extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.listComponentWillMount();
  }

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  renderUserList() {
    const onSelect = this.onSelect.bind(this);

    return this.props.users.map((user, index) =>
      (
        <ListItem
          key={user.id}
          leftElement={<Image
            source={{uri: user.profilePictureURL }}
            style={{ height: 40, width: 40 }}
          />}
          centerElement={`${user.firstName} ${user.lastName}`}
          selected={user.selected}
          onPress={() => onSelect(user, index)}
        />
      ),
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
         {this.renderUserList()}
      </ScrollView>
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
