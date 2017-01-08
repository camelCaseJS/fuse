import React from 'react';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import { fetchFriends } from '../actions/actions';

const Friends = () => (
  <Main
    left={<FriendsList />}
    right={<div>Right</div>}
    onComponentWillMount={fetchFriends}
  />
  );

export default Friends;
