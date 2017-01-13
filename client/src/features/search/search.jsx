import React from 'react';
import Main from '../../shared-components/main';
import SearchFriends from './searchFriends';

const Search = () => (
  <Main
    left={<SearchFriends />}
    right={<div />}
  />
  );

export default Search;
