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

export function capturePhoto() {
  console.log('captured photo!');
  const photo = 'INSERT PICTURE HERE';
  // const photo = this.refs.webcam.getScreenshot();
  return {
    type: CAPTURE_PHOTO,
    payload: photo,
  };
}

export function sendPhoto(photo, friendIdArray) {
  const request = axios.post('http://localhost:8000/photo')
  .then((response) => {
    console.log(response.data, 'photo sent to db');
  });

  return {
    type: SEND_PHOTO,
    payload: request,
  };
}