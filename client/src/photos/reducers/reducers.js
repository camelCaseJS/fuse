import { SELECT_PHOTO, FETCH_PHOTOS } from '../actions/actions';

const INITIAL_STATE = { selectedUserPhotos: [], selectedPhoto: [] };

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SELECT_PHOTO:
    //signals to state which photo of selectedUser'
    //photo library is enlarged in the photo component
      return { ...state, selectedPhoto: [...state.selectedFriends, action.payload] };
    case FETCH_PHOTOS:
       return { ...state, selectedUserPhotos: action.payload };
  }
  return state;
};
