import axios from 'axios';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';

export function fetchFriends() {

  const request = axios.get('http://localhost:8000/user/')
  .then((response) => {
    return response.data;
  });

  return {
    type: FETCH_FRIENDS,
    payload: request,
  };
}
