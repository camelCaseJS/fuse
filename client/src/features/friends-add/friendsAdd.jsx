import React from 'react';
import Main from '../../shared-components/main';
import SearchFriends from './searchFriends';

const AddFriends = () => (
  <Main
    left={<SearchFriends />}
    right={<div />}
  />
  );

export default AddFriends;
