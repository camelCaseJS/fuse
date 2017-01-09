import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import * as cameraActionCreators from '../actions/actions';
import Main from '../../main';
// import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

// let initialComponents = {
//   mediaBox: <p>BLANK MEDIA PAGE</p>,
//   cameraLabel: 'start camera',
//   buttonFunc: (() => (console.log('camera start func'))),
// };

let mediaBox = <p>BLANK MEDIA PAGE</p>;
let cameraLabel = 'start camera';
let buttonFunc = (() => (console.log('camera start func')));

class Camera extends Component {
  componentWillMount() {
    console.log('initial componentWillMount start');
    this.props.startCamera();
  }

  render() {
    if (this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox = <Webcam />;
      cameraLabel = 'take picture';
      buttonFunc = this.props.capturePhoto;
    } else if (!this.props.cameraOn && this.props.pictureCaptured) {
      mediaBox = <p>screenshot goes here</p>;
      cameraLabel = 'send to friends';
      buttonFunc = this.props.sendPhoto;
    } else if (!this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox = <p>BLANK MEDIA PAGE</p>;
      cameraLabel = 'start camera';
      buttonFunc = this.props.startCamera;
    }

    return (
      <Main
                left = {
                  <button
                    onClick={() => console.log({
                      cameraOn: this.props.cameraOn,
                      pictureTaken: this.props.pictureCaptured,
                      capturedPicture: this.props.capturedPicture,
                      anyFriendsSelected: this.props.anyFriendsSelected,
                    })}
                  >STATE CHECKER DELETE ME LATER</button>
                }

        right={
          <div >
            {mediaBox}
            <CameraButton
              label={cameraLabel}
              onClick={() => buttonFunc}
              startCamera={() => this.props.startCamera}
            />

          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => (
  {
    cameraOn: state.camera.cameraOn,
    pictureCaptured: state.camera.pictureCaptured,
    capturedPicture: state.camera.capturedPicture,
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
  sendPhoto: React.PropTypes.func.isRequired,
  anyFriendsSelected: React.PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, cameraActionCreators)(Camera);
