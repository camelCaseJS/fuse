import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const UsersListEntry = (props) => {
  const name = `${props.firstName} ${props.lastName}`;

  return (
    <ListItem
      primaryText={name}
      leftAvatar={<Avatar src={props.profilePictureURL} />}
      onTouchTap={props.onSelect}
    />
  );
};

UsersListEntry.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  profilePictureURL: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

export default UsersListEntry;

