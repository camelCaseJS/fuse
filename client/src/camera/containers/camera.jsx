import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import * as cameraActionCreators from '../actions/actions';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

// const toggleForTest = ()

const mediaBox = <p>YAO</p>;
class Camera extends Component {
  componentWillMount() {
    console.log(this.state);
  }

  render() {
    if (this.props.cameraOn) {
      const mediaBox = <Webcam />;
    }
    // cameraOn={this.props.cameraOn}
    //           pictureCaptured={this.props.pictureCaptured}
    //           capturedPicture={this.props.capturedPicture}
    // include if else statements here to change camera button
    // props.cameraOn ? 'camera on true' : 'camera on false'

                // <Webcam />

    return (
      <Main
        left={<FriendsList />}
        right={
          <div >
            {mediaBox}
            <CameraButton
              label={!this.props.cameraOn ? 'camera off!' : 'camera on!'}
              onClick={() => this.props.capturePhoto}
              startCamera={() => this.props.startCamera}
            />
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
    capturePhoto: state.camera.capturePhoto,
  }
);

Camera.propTypes = {
  cameraOn: React.PropTypes.bool.isRequired,
  pictureCaptured: React.PropTypes.bool.isRequired,
  capturedPicture: React.PropTypes.string.isRequired,
  startCamera: React.PropTypes.func.isRequired,
  capturePhoto: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, cameraActionCreators)(Camera);
