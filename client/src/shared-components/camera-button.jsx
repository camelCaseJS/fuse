import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { capturePicture } from '../camera/actions/actions';

const CameraButton = () => (
  <div>
    <FlatButton
      label="CameraButton"
      onClick={() => capturePicture()}
    />
    <div>

    </div>
  </div>
);

export default CameraButton;
