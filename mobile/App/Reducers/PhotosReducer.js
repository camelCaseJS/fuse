import { SELECT_PHOTO, FETCH_PHOTOS } from '../Actions/PhotosActions';
import { SELECT_FRIEND } from '../Actions/FriendsActions';

const INITIAL_STATE = {
  selectedUserPhotos: [],
  selectedPhoto: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_PHOTO:
      return { ...state, selectedPhoto: action.payload };
    case FETCH_PHOTOS:
      return { ...state, selectedUserPhotos: action.payload };
    default:
      return state;
  }
};
