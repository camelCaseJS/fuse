import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import * as cameraActionCreators from '../camera/actions/actions';


const CameraButton = () => (
  <div>
    <FlatButton
      label="CameraButton"
      // onClick={() => cameraOn()}
    />
    <div>

    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    cameraOn: false,
    pictureCaptured: false,
  };
};

export default connect(mapStateToProps, cameraActionCreators)(CameraButton);
