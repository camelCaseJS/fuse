
import { SEND_PHOTO, CAPTURE_PHOTO, START_CAMERA } from '../actions/actions';

const INITIAL_STATE = {
  cameraOn: true,
  pictureCaptured: false,
  anyFriendSelected: false,
  capturedPicture: '',
  imageFormat: 'image/jpeg',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_CAMERA:
      return {
        ...state,
        cameraOn: true,
      };

    case CAPTURE_PHOTO:
      return {
        ...state,
        cameraOn: false,
        pictureCaptured: true,
        capturedPicture: action.payload,
      };

    case SEND_PHOTO:
      // return state;
      return {
        ...state,
        cameraOn: false,
        pictureCaptured: false,
        capturedPicture: '',
        anyFriendSelected: false,
      };

    default:
      return state;
  }
};
