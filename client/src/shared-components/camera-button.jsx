import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import * as cameraActionCreators from '../camera/actions/actions';


const CameraButton = () => (
  <div>
    <FlatButton
      label={this.props.cameraOn ? 'camera on true' : 'camera on false'}
      onClick={() => this.props.startCamera()}
    />
    <div>
    {}
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    cameraOn: state.camera.cameraOn,
    pictureCaptured: state.camera.pictureCaptured,
    capturedPicture: state.camera.capturedPicture,
    // need to run through friends array and check for selected friend
    anyFriendsSelected: true,
  }
);

CameraButton.propTypes = {
  cameraOn: React.PropTypes.boolean.isRequired,
  pictureCaptured: React.PropTypes.boolean.isRequired,
  capturedPicture: React.PropTypes.boolean.isRequired,
};

export default connect(mapStateToProps, cameraActionCreators)(CameraButton);
