import axios from 'axios';
import url from '../configs/urls';


export const SELECT_PHOTO = 'SELECT_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const APPEND_NEW_PHOTO = 'APPEND_NEW_PHOTO';

// fetches photo library of selected user
export function fetchPhotos(friend) {
  // need to update this get request or pass in user id to fetch photos.

  // expect request to be an array of object photos
  // console.log('friend');
  // console.log(friend);
  const request = axios.get(`${url.photos}${friend.id}`)
  .then(response => (response.data));

  return {
    type: FETCH_PHOTOS,
    payload: request,
  };
}

export function appendNewPhoto(photo) {
  return {
    type: APPEND_NEW_PHOTO,
    payload: photo,
  };
}

// click handler to update selected photo by user
export function selectPhoto(photo) {
  // console.log('expect this to be selected photo object', photo);
  return {
    type: SELECT_PHOTO,
    payload: photo,
  };
}
