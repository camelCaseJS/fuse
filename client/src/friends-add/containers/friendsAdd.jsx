import React from 'react';
import Main from '../../main';
import SearchFriends from './searchFriends';

const AddFriends = () => (
  <Main
    left={<SearchFriends />}
    right={<div>Right</div>}
  />
  );

export default AddFriends;
