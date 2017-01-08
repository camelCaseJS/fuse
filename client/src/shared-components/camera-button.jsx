import React from 'react';
import FlatButton from 'material-ui/FlatButton';


const CameraButton = props => (
  <FlatButton
    // label="camera"
    label={props.cameraOn ? 'camera on true' : 'camera on false'}
    onClick={() => props.startCamera()}
  />
);


CameraButton.propTypes = {
  cameraOn: React.PropTypes.bool.isRequired,
  pictureCaptured: React.PropTypes.bool.isRequired,
  capturedPicture: React.PropTypes.string.isRequired,
  startCamera: React.PropTypes.func.isRequired,
};

export default CameraButton;
