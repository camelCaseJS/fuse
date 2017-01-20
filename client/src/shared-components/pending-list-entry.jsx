import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Accept from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import { red700, green700, greenA200, redA200 } from 'material-ui/styles/colors';
import { updateLists } from '../sockets-client/sockets';

const PendingListEntry = (props) => {
  const name = `${props.friendInfo.firstName} ${props.friendInfo.lastName}`;

  return (
    <div>
      <ListItem
        primaryText={name}
        leftAvatar={<Avatar src={props.friendInfo.profilePictureURL} />}
        rightIconButton={<div>
          <IconButton
            tooltip="Accept"
            tooltipPosition="top-center"
            onClick={() => {
              props.completeRequest(props.friendInfo.id);
              // console.log({
              //   friendInfo: props.friendInfo,
              //   userInfo: props.userInfo,

              // });
              updateLists(props.userInfo.user, props.friendInfo);
            }}
          >
            <Accept color={green700} hoverColor={greenA200} />
          </IconButton>
          <IconButton
            tooltip="Deny"
            tooltipPosition="top-center"
            onClick={() => {
              props.deleteRequest(props.friendInfo.id);
              updateLists(props.userInfo.user, props.friendInfo);
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
  deleteRequest: React.PropTypes.func.isRequired,
  friendInfo: React.PropTypes.object.isRequired,
  userInfo: React.PropTypes.object.isRequired,
};

export default PendingListEntry;

