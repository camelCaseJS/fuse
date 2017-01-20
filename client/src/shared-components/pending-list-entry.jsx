import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Accept from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import { red700, green700, greenA200, redA200 } from 'material-ui/styles/colors';


const PendingListEntry = (props) => {
  const name = `${props.firstName} ${props.lastName}`;


  return (
    <div>
      <ListItem
        primaryText={name}
        leftAvatar={<Avatar src={props.profilePictureURL} />}
        rightIconButton={<div>
          <IconButton
            tooltip="Accept"
            tooltipPosition="top-center"
            onClick={() => {
              props.completeRequest(props.friendId);
              props.updateLists();
            }}
          >
            <Accept color={green700} hoverColor={greenA200} />
          </IconButton>
          <IconButton
            tooltip="Deny"
            tooltipPosition="top-center"
            onClick={() => {
              props.deleteRequest(props.friendId);
              props.updateLists();
            }}
          >
            <Clear color={red700} hoverColor={redA200} />
          </IconButton>
        </div>}
      />
    </div>
  );
};


PendingListEntry.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  friendId: React.PropTypes.number.isRequired,
  profilePictureURL: React.PropTypes.string.isRequired,
  deleteRequest: React.PropTypes.func.isRequired,
  updateLists: React.PropTypes.func.isRequired,
};

export default PendingListEntry;

