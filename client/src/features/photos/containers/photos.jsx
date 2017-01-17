import React from 'react';
import Main from '../../../shared-components/main';
import Friends from '../../friends/containers/friends';
import PhotosList from '../components/photos-list';


const Photos = () => (
  (<Main
    left={<Friends />}
    right={
      <img
        src="https://cdn.meme.am/cache/images/folder459/300x/8557459.jpg"
        role="presentation"
      />
    }
  />)
);

export default Photos;
