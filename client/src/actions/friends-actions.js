import axios from 'axios';
import url from '../configs/urls';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const HANDLE_TAB_SWITCH = 'HANDLE_TAB_SWITCH';
export const GET_USER_INFO = 'GET_USER_INFO';
export const FETCH_PENDING_FRIENDS = 'FETCH_PENDING_FRIENDS';
export const DESTROY_SENT_PENDING = 'DESTROY_SENT_PENDING';
export const DESTROY_RECEIVED_PENDING = 'DESTROY_RECEIVED_PENDING';
export const DESTROY_FRIENDSHIPS = 'DESTROY_FRIENDSHIPS';
export const DESTROY_ONE_FRIENDSHIP = 'DESTROY_ONE_FRIENDSHIP';

export function fetchFriends() {
  const request = axios.get(`${url.users}`)
  .then((response) => {
    // console.log(response.data, 'data in actions');
    return response.data.map((friend) => {
      return { ...friend, selected: false };
    });
  });

  return {
    type: FETCH_FRIENDS,
    payload: request,
  };
}

export function fetchPendingFriends() {
  const request = axios.get(`${url.pending}`)
  .then(response =>
    response.data,
  );
  return {
    type: FETCH_PENDING_FRIENDS,
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

export function getUserInfo() {
  const request = axios.get(`${url.userInfo}`)
  .then(response =>
    response.data,
  );
  return {
    type: GET_USER_INFO,
    payload: request,
  };
}

export function handleTabSwitch(value) {
  return {
    type: HANDLE_TAB_SWITCH,
    payload: value,
  };
}

export function destroySentPending() {
  console.log('clear pending in actions');
  axios.get(`${url.destroyPending}/sent`);
  return {
    type: DESTROY_SENT_PENDING,
    payload: [],
  };
}

export function destroyReceivedPending() {
  console.log('clear pending in actions');
  axios.get(`${url.destroyPending}/received`);
  return {
    type: DESTROY_RECEIVED_PENDING,
    payload: [],
  };
}

export function destroyFriendships() {
  console.log('clear friendships in actions');
  axios.get(`${url.destroyFriendships}`);
  return {
    type: DESTROY_FRIENDSHIPS,
    payload: [],

  };
}

export function destroyOneFriendship() {
  console.log('delete one friend');
  axios.get(`${url.destroyOneFriendship}`)
  .then(response => response.data);
  return {
    type: DESTROY_ONE_FRIENDSHIP,
  };
}

