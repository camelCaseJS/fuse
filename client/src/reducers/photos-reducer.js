import { SELECT_PHOTO, FETCH_PHOTOS, APPEND_NEW_PHOTO } from '../actions/photos-actions';
import { SELECT_FRIEND } from '../actions/friends-actions';

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

    case SELECT_FRIEND:
      return { ...state, ...INITIAL_STATE };

    case APPEND_NEW_PHOTO: {
      const newPhotoList = [...state.selectedUserPhotos];
      console.log(newPhotoList);
      newPhotoList.push(action.payload);
      return {
        ...state,
        selectedUserPhotos: newPhotoList,
      };
    }
    default:
      return state;
  }
};
