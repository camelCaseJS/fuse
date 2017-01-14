import React from 'react';
import Main from '../../../shared-components/main';
import Friends from '../../friends/containers/friends';
import PhotosList from '../components/photos-list';


const Photos = () => {

  return (
    <Main
      left={<Friends />}
      right={<PhotosList />}
    />
  );
};

export default Photos;
