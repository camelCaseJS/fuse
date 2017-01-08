import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import * as cameraActionCreators from '../actions/actions';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

// const toggleForTest = ()
class Camera extends Component {
  componentWillMount() {
    console.log(this.state);
  }

  render() {
    return (
      <Main
        left={<FriendsList />}
        right={
          <div>
            <Webcam />
            <CameraButton />
          </div>}
      />
    );
  }
}

const mapStateToProps = state => (
  {
    cameraOn: state.camera.cameraOn,
    pictureCaptured: state.camera.pictureCaptured,
    capturedPicture: state.camera.capturedPicture,
    // need to run through friends array and check for selected friend
    anyFriendsSelected: true,
  }
);

export default connect(mapStateToProps, cameraActionCreators)(Camera);
