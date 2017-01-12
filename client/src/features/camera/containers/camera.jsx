import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import * as cameraActionCreators from '../actions/actions';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';
import createSocket from '../../sockets-client/sockets';

// let initialComponents = {
//   mediaBox: <p>BLANK MEDIA PAGE</p>,
//   cameraLabel: 'start camera',
//   buttonFunc: (() => (console.log('camera start func'))),
// };

let mediaBox = <p>BLANK MEDIA PAGE</p>;
let cameraLabel = 'start camera';
let buttonFunc = (() => (console.log('camera start func')));
// let buttonSource = '../../icons/startCamera.png';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.getScreenshot = this.getScreenshot.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.sendPhotoToActionCreator = this.sendPhotoToActionCreator.bind(this);
  }

  componentWillMount() {
    this.props.startCamera();
    createSocket();
  }

  getScreenshot() {
    const canvas = this.getCanvas();
    const photoRaw = canvas.toDataURL(this.props.imageFormat);
    canvas.toBlob((imageBlob) => {
      this.props.capturePhoto(photoRaw, imageBlob);
    }, 'image/jpeg');
  }

  getCanvas() {
    const video = findDOMNode(this.refs.webcam);
    if (!this.ctx) {
      const canvas = document.createElement('canvas');
      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = video.clientWidth;
      canvas.height = video.clientWidth / aspectRatio;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }
    const { ctx, canvas } = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  sendPhotoToActionCreator() {
    const currentDate = new Date().getTime();
    const dateString = `${currentDate}.jpg`;
    this.props.sendPhoto(this.props.capturedPicture, dateString);
  }

  render() {
    if (this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox = <Webcam ref="webcam" />;
      cameraLabel = 'take picture';
      buttonFunc = this.getScreenshot;
    } else if (!this.props.cameraOn && this.props.pictureCaptured) {
      mediaBox = <img src={this.props.capturedPictureRaw} />;
      cameraLabel = 'send to friends';
      buttonFunc = this.sendPhotoToActionCreator;
    } else if (!this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox= <div className="placeholder" ></div>;
      cameraLabel = 'Take New Photo';
      buttonFunc = this.props.startCamera;
    }

    return (
      <Main
        left={<FriendsList />}
        right={
          <div >
            {mediaBox}
            <CameraButton
              // src={buttonSource}
              label={cameraLabel}
              onClick={() => buttonFunc()}
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
    capturedPictureRaw: state.camera.capturedPictureRaw,
    anyFriendsSelected: true,
    capturePhoto: state.camera.capturePhoto,
    imageFormat: state.camera.imageFormat,
  }
);

Camera.propTypes = {
  cameraOn: React.PropTypes.bool.isRequired,
  pictureCaptured: React.PropTypes.bool.isRequired,
  capturedPictureRaw: React.PropTypes.string.isRequired,
  capturedPicture: React.PropTypes.object.isRequired,
  startCamera: React.PropTypes.func.isRequired,
  capturePhoto: React.PropTypes.func.isRequired,
  sendPhoto: React.PropTypes.func.isRequired,
  // anyFriendsSelected: React.PropTypes.bool.isRequired,
  imageFormat: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, cameraActionCreators)(Camera);
