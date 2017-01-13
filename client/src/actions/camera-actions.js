import axios from 'axios';

export const CAPTURE_PHOTO = 'CAPTURE_PHOTO';
export const SEND_PHOTO = 'SEND_PHOTO';
export const START_CAMERA = 'START_CAMERA';
export const START_SOCKET_CONN = 'START_SOCKET_CONN';

// will have to edit this for deployment!!
const url = 'http://localhost:8000';

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
  // const header = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryqAxDdHuytAhP8M4X',
  //   },
  // };

  const fd = new FormData();
  fd.append('image', photoBlob, date);

  axios.post(`${url}/api/photos/`, fd)
  .then((response) => {
    console.log(response.data, 'photo sent to db');
  });
  console.log('send photo');
  return {
    type: SEND_PHOTO,
    // payload: friendId,
  };
}

export function serverStartSocketConnection(userId) {
  axios.get(`${url}/api/user/${userId}`)
  .then((response) => {
    console.log(response.data.active);
  });
  return {
    type: START_SOCKET_CONN,
    payload: true,
  };
}

