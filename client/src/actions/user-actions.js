import axios from 'axios';
import url from '../configs/urls';

export const GET_USER_INFO = 'GET_USER_INFO';

export function getUserInfo() {
  const request = axios.get(`${url.users}/userInfo`)
  .then(response =>
    response.data,
  );
  return {
    type: GET_USER_INFO,
    payload: request,
  };
}

