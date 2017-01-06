import React from 'react';
import Main from '../main';
import UsersList from '../shared-components/users-list';

const Friends = () => {
  const defaultUser = {
    firstName: 'firstName',
    lastName: 'lastName',
    profilePictureURL: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
  };

  return (
    <Main
      left={
        <UsersList usersList={[defaultUser]} />
      } right={
        <div>
        photos.
        </div>
      }
    />
  );
};

export default Friends;
