import axios from 'axios';

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const SEARCH_SELECT_FRIEND = 'SEARCH_SELECT_FRIEND';
export const ADD_SELECT_FRIEND_TO_DB = 'ADD_SELECT_FRIEND_TO_DB';

export function searchFriends(email) {
  // console.log('this is email passed in ', email);
  const url = `http://localhost:8000/api/users/${email}`;
  // console.log('this is url', url);
  // need to update here get request to the db with specific query, in this case an email
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

export function addFriendsToDB(id) {
  // select id from friend and post to http://localhost:8000/user/id
  // console.log('in addFriendsToDB. this is id', id);
  const url = `http://localhost:8000/api/users/${id}`;
  // console.log('this is url in addFriendsToDB', url);


  // this will be a post request to the db.
  axios.post(url)
  .then((response) => {
    console.log(response.data);
    // return response.data.map((friend) => {
    //   return { ...friend, selected: false };
    // });
  });

  // won't really be using payload, just make it a boolean?
  return {
    type: ADD_SELECT_FRIEND_TO_DB,
    // payload: request,
  };
}
