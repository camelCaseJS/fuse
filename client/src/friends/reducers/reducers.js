import { FETCH_FRIENDS, SELECT_FRIEND, UNSELECT_ALL_FRIENDS } from '../actions/actions';

const INITIAL_STATE = {
  allFriends: [],
  lastSelectedFriend: {} };

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
    default:
      return state;
  }
};
