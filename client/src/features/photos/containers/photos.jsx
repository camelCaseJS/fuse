import React from 'react';
import Main from '../../../shared-components/main';
import FriendsList from '../../../shared-components/friends-list';
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
