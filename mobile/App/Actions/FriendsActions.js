import React from 'react';
import axios from 'axios';
import URL from '../Config/URL';
import { ScrollView, Text, Image, View } from 'react-native';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const GET_USER_INFO = 'GET_USER_INFO';

export function fetchFriends() {
  const request = axios.get(URL.users)
  .then((response) => {
    return response.data.map((friend) => {
      return { ...friend, selected: false };
    });
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
