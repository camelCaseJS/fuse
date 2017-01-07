
import { SEND_PHOTOS, CAPTURE_PHOTO, START_CAMERA } from '../actions/actions';

const INITIAL_STATE = {
  cameraOn: false,
  pictureCaptured: false,
  anyFriendSelected: false,
  capturedPicture: null,
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

    case SEND_PHOTOS:
      return state;
      // return { ...state, anyFriendSelected: true };

    default:
      return state;
  }
};
