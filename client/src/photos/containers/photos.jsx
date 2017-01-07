import React from 'react';
import Main from '../../main';
import UsersList from '../../shared-components/users-list';
import PhotosList from '../components/photos-list';


const Photos = () => {

  return (
    <Main
      left={<FriendsList />}
      right={<PhotosList />}
    />
  );
};

export default Photos;
