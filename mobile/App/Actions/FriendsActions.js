import axios from 'axios';
import URL from '../Config/URL';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SWITCH_TAB = 'SWITCH_TAB';
export const FETCH_PENDING_FRIENDS = 'FETCH_PENDING_FRIENDS';
export const DESTROY_FRIEND_REQUEST = 'DESTROY_FRIEND_REQUEST';
export const COMPLETE_FRIEND_REQUEST = 'COMPLETE_FRIEND_REQUEST';

export function fetchFriends() {
  const request = axios.get(URL.users)
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response.data.map((friend) => {
          return { ...friend, selected: false };
        });
      }
      // if response from server is not an array, return an empty array instead
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

export function switchTab(tabIndex) {
  console.log('switch to ', tabIndex);
  return {
    type: SWITCH_TAB,
    payload: tabIndex,
  };
}

export function fetchPendingFriends() {
  const request = axios.get(URL.pending)
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response.data;
      }
        // if response from server is not an array, return an empty array instead
      return [];
    })
  .catch((error) => {
    console.log(`${error} in fetchPendingFriends`);
    return [];
  });
  return {
    type: FETCH_PENDING_FRIENDS,
    payload: request,
  };
}

export function destroyFriendRequest(senderId) {
  axios.post(`${URL.destroyRequest}`, { senderId })
  .then(response => response.data)
  .catch(error => console.log(error));
  return {
    type: DESTROY_FRIEND_REQUEST,
    payload: senderId,
  };
}

export function completeFriendRequest(senderId) {
  axios.post(`${URL.completeRequest}`, { senderId })
  .then(response => response.data)
  .catch(error => console.log(error));
  return {
    type: COMPLETE_FRIEND_REQUEST,
    payload: senderId,
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
