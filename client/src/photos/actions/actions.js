import axios from 'axios';

export const SELECT_PHOTO = 'SELECT_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';

const testPhotos = [
  { link: 'http://www.viraltravel.com/wp-content/uploads/2014/04/1024x697x1-travel-flickr-Moyan_Brenn.jpg.pagespeed.ic.z8ovT-0rzr.jpg' },
  { link: 'http://beersandbeans.com/wp-content/uploads/On-the-road-in-Vietnam-by-toehk-via-Flickr.jpg' },
  { link: 'https://farm8.staticflickr.com/7520/15507596939_9e0ae1759c_b.jpg' },
  { link: 'https://iso.500px.com/wp-content/uploads/2015/02/Header-3.jpg' },
  { link: 'http://www.flightswatcher.com/wp-content/uploads/2016/01/lonely-planet.jpg' },
];

// fetches photo library of selected user
export function fetchPhotos() {
  // need to update this get request or pass in user id to fetch photos.

  // expect request to be an array of object photos
  const request = axios.get('http://localhost:8000/user/')
  .then((response) => {
    // return response.data;
    return testPhotos;
  });

  return {
    type: FETCH_PHOTOS,
    payload: request,
  };
}

// click handler to update selected photo by user
export function selectPhoto(photo) {
  console.log('expect this to be selected photo object', photo);
  return {
    type: SELECT_PHOTO,
    payload: photo,
  };
}
