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
  const photo = 'picture link here';
  // const photo = this.refs.webcam.getScreenshot();
  return {
    type: CAPTURE_PHOTO,
    payload: photo,
  };
}

  // getScreenshot() {
  //   if (!this.state.pictureCaptured) return null;

  //   let canvas = this.getCanvas();
  //   return canvas.toDataURL(this.props.);
  // }

  // getCanvas() {
  //   if (!this.state.pictureCaptured) return null;

  //   const video = findDOMNode(this);
  //   console.log(video,'VIDEOO');
  //   if (!this.ctx) {
  //     let canvas = document.createElement('canvas');
  //     const aspectRatio = video.videoWidth / video.videoHeight;

  //     canvas.width = video.clientWidth;
  //     canvas.height = video.clientWidth / aspectRatio;

  //     this.canvas = canvas;
  //     this.ctx = canvas.getContext('2d');
  //   }

  //   const {ctx, canvas} = this;
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   return canvas;
  // }

export function sendPhoto(photo, friendId) {
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
