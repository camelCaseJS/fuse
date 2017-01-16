import React from 'react';
import IconButton from 'material-ui/IconButton';
import TakePicture from 'material-ui/svg-icons/image/camera';
// import Search from 'material-ui/svg-icons/action/search';
import Send from 'material-ui/svg-icons/content/send';
import Camera from 'material-ui/svg-icons/image/camera-alt';

function buttonLogo(mode) {
  if (mode === 'ON') {
    return <TakePicture />;
  } else if (mode === 'PICTURE') {
    return <Send />;
  }
  return <Camera />;
}

const CameraButton = props => (
  <IconButton
    onTouchTap={props.onClick}
  >
    {buttonLogo(props.mode)}
  </IconButton>
);

CameraButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  mode: React.PropTypes.string.isRequired,
};

export default CameraButton;
