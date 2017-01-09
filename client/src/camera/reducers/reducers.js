
import { SEND_PHOTO, CAPTURE_PHOTO, START_CAMERA } from '../actions/actions';

const INITIAL_STATE = {
  cameraOn: true,
  pictureCaptured: false,
  anyFriendSelected: false,
  capturedPictureRaw: '',
  capturedPicture: {},
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
        capturedPicture: action.payload.photoImg,
        capturedPictureRaw: action.payload.photoRaw,
      };

    case SEND_PHOTO:
      return {
        ...state,
        cameraOn: false,
        pictureCaptured: false,
        capturedPictureRaw: '',
        capturedPicture: {},
        anyFriendSelected: false,
      };

    default:
      return state;
  }
};
