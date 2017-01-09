import axios from 'axios';

export const CAPTURE_PHOTO = 'CAPTURE_PHOTO';
export const SEND_PHOTO = 'SEND_PHOTO';
export const START_CAMERA = 'START_CAMERA';

export function startCamera() {
  console.log('camera on');
  return {
    type: START_CAMERA,
  };
}

export function capturePhoto(photo) {
  console.log('captured photo!');
  return {
    type: CAPTURE_PHOTO,
    payload: photo,
  };
}


export function sendPhoto(friendId) {
  // const request = axios.post('http://localhost:8000/photo')
  // .then((response) => {
  //   console.log(response.data, 'photo sent to db');
  // });
  console.log('send photo');
  return {
    type: SEND_PHOTO,
    payload: friendId,
  };
}
