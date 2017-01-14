import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import * as cameraActionCreators from '../../../actions/camera-actions';
import CameraButton from '../../../shared-components/camera-button';

let cameraMode = 'OFF';

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
  }

  onCameraButtonPress(mode) {
    console.log(mode);
    if (mode === 'ON') {
      this.getScreenshot();
    } else if (mode === 'PICTURE') {
      this.sendPhotoToActionCreator();
    } else {
      // mode === 'OFF'
      this.props.startCamera();
    }
  }

  getScreenshot() {
    console.log('getScreenshot');
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

  generateMediaBox(mode) {
    if (mode === 'ON') {
      return (<Webcam ref="webcam" />);
    }
    if (mode === 'PICTURE') {
      return (
        <img
          src={this.props.capturedPictureRaw}
          role="presentation"
        />
      );
    }
    // mode === 'OFF'
    return (<div className="placeholder" />);
  }

  generateCameraLabel(mode) {
    if (mode === 'ON') {
      return 'Take picture';
    }
    if (mode === 'PICTURE') {
      return 'Send to friends';
    }
    // mode === 'OFF'
    return 'Camera ON';
  }

  render() {
    if (this.props.cameraOn && !this.props.pictureCaptured) {
      cameraMode = 'ON';
    } else if (!this.props.cameraOn && this.props.pictureCaptured) {
      cameraMode = 'PICTURE';
    } else if (!this.props.cameraOn && !this.props.pictureCaptured) {
      cameraMode = 'OFF';
    }
    console.log('camera mode', cameraMode);

    return (
      <div >
        {this.generateMediaBox(cameraMode)}
        <CameraButton
          // src={buttonSource}
          label={this.generateCameraLabel(cameraMode)}
          onClick={() => this.onCameraButtonPress(cameraMode)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ camera, router }) => {
  return {
    cameraOn: camera.cameraOn,
    pictureCaptured: camera.pictureCaptured,
    capturedPicture: camera.capturedPicture,
    capturedPictureRaw: camera.capturedPictureRaw,
    // anyFriendsSelected: true,
    capturePhoto: camera.capturePhoto,
    imageFormat: camera.imageFormat,
    // serverSocketConnectionActive: camera.serverSocketConnectionActive,
    router,
  };
};


Camera.propTypes = {
  cameraOn: PropTypes.bool.isRequired,
  pictureCaptured: PropTypes.bool.isRequired,
  capturedPictureRaw: PropTypes.string.isRequired,
  capturedPicture: PropTypes.object.isRequired,
  startCamera: PropTypes.func.isRequired,
  capturePhoto: PropTypes.func.isRequired,
  sendPhoto: PropTypes.func.isRequired,
  imageFormat: PropTypes.string.isRequired,
};

Camera.contextTypes = {
  router: PropTypes.object };


export default connect(mapStateToProps, cameraActionCreators)(Camera);
