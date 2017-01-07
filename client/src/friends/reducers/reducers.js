import { FETCH_FRIENDS, SELECT_FRIEND } from '../actions/actions';

const INITIAL_STATE = { allFriends: [], selectedFriends: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      // Creates an object with all properties copied from state
      // Then replaces allFriends with action.payload
      return { ...state, allFriends: action.payload };
    case SELECT_FRIEND:
      // Creates and object with properties copied from states
      // Added action.paylod to the end of selected friends
      return { ...state, selectedFriends: [...state.selectedFriends, action.payload] };
    default:
      return state;
  }
};
