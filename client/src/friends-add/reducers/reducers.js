import { SEARCH_SELECT_FRIEND, SEARCH_FRIENDS, ADD_SELECT_FRIEND_TO_DB } from '../actions/actions';

const INITIAL_STATE = {
  searchedFriends: [],
  selectedFriend: {},
  searchedFriendSelected: false,
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SEARCH_FRIENDS:
      // Creates an object with all properties copied from state
      // Then replaces allFriends with action.payload
      return { ...state, searchedFriends: action.payload };
    case SEARCH_SELECT_FRIEND: {
      // Creates and object with properties copied from states
      // Replace lastSelectedFriend from the action payload
      const newState = {
        ...state,
        searchedFriends: [...state.searchedFriends],
        selectedFriend: action.payload.friend,
        searchedFriendSelected: true,
      };
      const index = action.payload.index;

      // Toggle the selected state of the friend at index
      newState.searchedFriends[index].selected = !newState.searchedFriends[index].selected;

      return newState;
    }
    case ADD_SELECT_FRIEND_TO_DB: {
      const newState = {
        searchedFriends: [],
        selectedFriend: {},
        searchedFriendSelected: false,
      };
      return newState;
    }
    default:
      return state;
  }
};
