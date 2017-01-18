import axios from 'axios';
import url from '../configs/urls';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const HANDLE_TAB_SWITCH = 'HANDLE_TAB_SWITCH';
export const GET_USER_INFO = 'GET_USER_INFO';
export const FETCH_PENDING_FRIENDS = 'FETCH_PENDING_FRIENDS';

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
  console.log('IN FRIENDS ACTIONS');
  const request = axios.get(`${url.pending}`)
  .then(response => (response));
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

