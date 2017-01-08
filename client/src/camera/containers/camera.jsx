import React from 'react';
import Webcam from 'react-webcam';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

// const toggleForTest = ()
const Camera = () => {
  return (
    <Main
      left={<FriendsList />}
      right={
        <div>
          <Webcam />
          <CameraButton />
        </div>
      }
    />
  );
};


export default Camera;
