import axios from 'axios';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';

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

export function selectFriend(friend) {
  console.log('friend');
  console.log(friend);
  return {
    type: SELECT_FRIEND,
    payload: friend,
  };
}
