import React from 'react';
import FlatButton from 'material-ui/FlatButton';


const CameraButton = props => (
  <FlatButton
    label={props.label}
    onTouchTap={props.onClick}
  />
);


CameraButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default CameraButton;
