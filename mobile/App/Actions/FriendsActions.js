import axios from 'axios';
import URL from '../Config/URL';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const GET_USER_INFO = 'GET_USER_INFO';

export function fetchFriends() {
  const request = axios.get(URL.users)
      .then((response) => {
        if (Array.isArray(response.data)) {
          return response.data.map((friend) => {
            return { ...friend, selected: false };
          });
        }
        // if response from server is not an array, return an empty array instead
        // This solves a problem if the server redirects
        return [];
      })
  .catch((error) => {
    console.log(`${error} in fetchFriends`);
    return [];
  });

  return {
    type: FETCH_FRIENDS,
    payload: request,
  };
}

export function selectFriend(friend, index) {
  return {
    type: SELECT_FRIEND,
    payload: { friend, index },
  };
}

export function unselectAllFriends() {
  return {
    type: UNSELECT_ALL_FRIENDS,
    payload: null,
  };
}

// export function getUserInfo() {
//   const request = axios.get(URL.userInfo)
//   .then(response =>
//     response.data,
//   );
//   return {
//     type: GET_USER_INFO,
//     payload: request,
//   };
// }
