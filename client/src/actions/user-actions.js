import axios from 'axios';

export const GET_USER_INFO = 'GET_USER_INFO';

const url = 'http://localhost:8000';

export function getUserInfo() {
  const request = axios.get(`${url}/api/users/userInfo`)
  .then(response =>
    response.data,
  );
  return {
    type: GET_USER_INFO,
    payload: request,
  };
}

