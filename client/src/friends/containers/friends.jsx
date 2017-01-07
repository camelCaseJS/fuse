import React from 'react';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import { fetchFriends } from '../actions/actions';

const Friends = () => {

  return (
    <Main
      left={<FriendsList />}
      right={<div>Photos</div>}
      onComponentWillMount={fetchFriends}
    />
  );
};

export default Friends;
