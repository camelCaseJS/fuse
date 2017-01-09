import { SELECT_PHOTO, FETCH_PHOTOS } from '../actions/actions';
import { SELECT_FRIEND } from '../../friends/actions/actions';

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
    default:
      return state;
  }
};
