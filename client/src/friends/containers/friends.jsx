import React from 'react';
import Main from '../../main';
import UsersList from '../../shared-components/users-list';

const Friends = () => {

  return (
    <Main
      left={<UsersList />}
      right={<div>Photos</div>}
    />
  );
};

export default Friends;
