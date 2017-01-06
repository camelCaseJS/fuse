import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const UsersListEntry = (props) => {
  const name = `${props.firstName} ${props.lastName}`;

  return (
    <ListItem
      primaryText={name}
      leftAvatar={<Avatar src={props.profilePictureURL} />}
    />
  );
};

UsersListEntry.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  profilePictureURL: React.PropTypes.string.isRequired,
};

export default UsersListEntry;

