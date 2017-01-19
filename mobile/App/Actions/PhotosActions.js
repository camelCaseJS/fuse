import axios from 'axios';
import URL from '../Config/URL';

export const SELECT_PHOTO = 'SELECT_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';

// fetches photo library of selected user
export function fetchPhotos(friend) {
  // need to update this get request or pass in user id to fetch photos.

  const request = axios.get(`${URL.photos}${friend.id}`)
  .then(response => (response.data));

  return {
    type: FETCH_PHOTOS,
    payload: request,
  };
}

// click handler to update selected photo by user
export function selectPhoto(photo) {
  return {
    type: SELECT_PHOTO,
    payload: photo,
  };
}
