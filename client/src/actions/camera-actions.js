import axios from 'axios';
import url from '../configs/urls';

export const CAPTURE_PHOTO = 'CAPTURE_PHOTO';
export const SEND_PHOTO = 'SEND_PHOTO';
export const START_CAMERA = 'START_CAMERA';

// will have to edit this for deployment!!

export function startCamera() {
  console.log('camera on');
  return {
    type: START_CAMERA,
  };
}

export function capturePhoto(photoRaw, photoImg) {
  console.log('captured photo!');
  return {
    type: CAPTURE_PHOTO,
    payload: {
      photoRaw,
      photoImg,
    },
  };
}


export function sendPhoto(photoBlob, date) {
  const fd = new FormData();
  fd.append('image', photoBlob, date);

  axios.post(`${url.photos}`, fd)
  .then((response) => {
    console.log(response.data, 'photo sent to db');
  });
  console.log('send photo');
  return {
    type: SEND_PHOTO,
    // payload: friendId,
  };
}

