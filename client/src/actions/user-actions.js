import axios from 'axios';
import url from '../configs/urls';

export const GET_USER_INFO = 'GET_USER_INFO';

export function getUserInfo() {
  // console.log('inside action creator');
  const request = axios.get(`${url.users}/userInfo`)
  .then(response => {
    // console.log(response.data, 'inside action');
    return response.data;
  },
  )
  .catch((err) => {
    console.log(err);
  });
  return {
    type: GET_USER_INFO,
    payload: request,
  };
}

