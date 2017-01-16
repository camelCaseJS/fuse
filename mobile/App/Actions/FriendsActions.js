import React from 'react';
import axios from 'axios';
import URL from '../Config/URL';
import { ScrollView, Text, Image, View } from 'react-native';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const UNSELECT_ALL_FRIENDS = 'UNSELECT_ALL_FRIENDS';
export const GET_USER_INFO = 'GET_USER_INFO';

const dataObjects = [
  { id: 1,
    firstName: 'Philip',
    lastName: 'Fry',
    image: 'https://www.wired.com/images_blogs/underwire/2010/06/fry_660.jpg',
  },
  { id: 2,
    firstName: 'Bender',
    lastName: 'Rodriguez',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png',
  },
  { id: 3,
    firstName: 'Prof',
    lastName: 'Fransworth',
    image: 'http://suptg.thisisnotatrueending.com/archive/4552543/images/1242295402621.jpg',
  },
];

dataObjects.map((user) => {
  user.image =  <Image
    source={{uri: user.image }}
    style={{ height: 40, width: 40 }}
  />;
  return user;
});

export function fetchFriends() {
  console.log('URL.users');
  console.log(URL.users);
  const request = axios.get(URL.users)
  .then((response) => {
    console.log('response');
    console.log(response);
    return response.data.map((friend) => {
      console.log('friend!');
      console.log(friend);
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
