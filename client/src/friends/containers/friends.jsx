import React from 'react';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';

const Friends = () => (
  <Main
    left={<FriendsList />}
    right={<div>Right</div>}
  />
  );

export default Friends;
