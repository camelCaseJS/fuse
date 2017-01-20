import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '../Themes';
import { Avatar, ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';
// import UsersListEntry from './users-list-entry';

// Styles
import styles from './Styles/UsersListStyle';

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

    if (this.props.users) {

      return this.props.users.map((user, index) =>
        (
          <ListItem
            divider
            style={
              { container:styles.listContainer,
                contentViewContainer: styles.contentViewContainer,
               primaryText:
              user.selected ? styles.selected : styles.unselected }}
            key={user.id}
            leftElement={<Image
              source={{uri: user.profilePictureURL }}
              style={{ height: 40, width: 40 }}
            />}
            centerElement={`${user.firstName} ${user.lastName}`}
            rightElement={this.props.rightElement(user, index)}
            onPress={() => onSelect(user, index)}
          />
        ),
      );
    }
    return <View />;
  }


  render() {
    return (
      <View style={styles.container}>
         {this.renderUserList()}
      </View>
    );
  }
}

UsersList.propTypes = {
  rightElement: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  listComponentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
  componentForEmptyList: PropTypes.object,
};

UsersList.defaultProps = {
  listComponentWillMount: () => {},
  onSelect: () => {},
  rightElement: () => {},
  componentForEmptyList: null,
};

export default UsersList;
