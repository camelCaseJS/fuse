import axios from 'axios';

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const SEARCH_SELECT_FRIEND = 'SEARCH_SELECT_FRIEND';
export const ADD_SELECT_FRIEND_TO_DB = 'ADD_SELECT_FRIEND_TO_DB';

export function searchFriends(email) {
  const url = 'http://localhost:8000/user/';

  //need to update here get request to the db with specific query, in this case an email
  const request = axios.get(url)
  .then((response) => {
    return response.data.map((friend) => {
      return { ...friend, selected: false };
    });
  });

  return {
    type: SEARCH_FRIENDS,
    payload: request,
  };
}

export function searchSelectFriend(friend, index) {
  return {
    type: SEARCH_SELECT_FRIEND,
    payload: { friend, index },
  };
}

export function addFriendsToDB() {
  const url = '';

  //this will be a post request to the db.
  const request = axios.post(url)
  .then((response) => {
    return response.data.map((friend) => {
      return { ...friend, selected: false };
    });
  });

  //won't really be using payload, just make it a boolean?
  return {
    type: ADD_SELECT_FRIEND_TO_DB,
    payload: request,
  };

};
