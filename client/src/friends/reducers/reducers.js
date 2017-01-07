import { FETCH_FRIENDS, SELECT_FRIEND } from '../actions/actions';

const INITIAL_STATE = {
  allFriends: [],
  lastSelectedFriend: {} };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case FETCH_FRIENDS:
      // Creates an object with all properties copied from state
      // Then replaces allFriends with action.payload
      return { ...state, allFriends: action.payload };
    case SELECT_FRIEND: {
      // Creates and object with properties copied from states
      // Replace lastSelectedFriend from the action payload
      const newState = { ...state,
        lastSelectedFriend: action.payload.friend };
      const index = action.payload.index;

      // Toggle the selected state of the friend at index
      newState.allFriends[index].selected = !state.allFriends[index].selected;

      return newState;
    }
    default:
      return state;
  }
};
