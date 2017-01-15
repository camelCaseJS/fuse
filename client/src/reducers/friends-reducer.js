import { FETCH_FRIENDS, SELECT_FRIEND, UNSELECT_ALL_FRIENDS, GET_USER_INFO } from '../actions/friends-actions';


// NEED TO PUT USER INFO INTO STATE OF ANY COMPONENT THAT USES GETINFO
const INITIAL_STATE = {
  allFriends: [],
  lastSelectedFriend: {},
  userInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UNSELECT_ALL_FRIENDS: {
      const newState = {
        ...state,
        allFriends: [...state.allFriends],
        lastSelectedFriend: {} };
      newState.allFriends.map((friend) => {
        const newFriend = friend;
        newFriend.selected = false;
        return friend;
      });
      return newState;
    }

    case FETCH_FRIENDS:
      // Creates an object with all properties copied from state
      // Then replaces allFriends with action.payload
      return { ...state, allFriends: action.payload };

    case SELECT_FRIEND: {
      // Creates and object with properties copied from states
      // Replace lastSelectedFriend from the action payload
      const newState = {
        ...state,
        allFriends: [...state.allFriends],
        lastSelectedFriend: action.payload.friend };
      const index = action.payload.index;

      // Toggle the selected state of the friend at index
      newState.allFriends[index].selected = !newState.allFriends[index].selected;
      return newState;
    }

    case GET_USER_INFO: {
      // console.log(action.payload, 'GOT TO GET USER INFO');
      return {
        ...state,
        userInfo: action.payload,
      };
    }

    default:
      return state;
  }
};