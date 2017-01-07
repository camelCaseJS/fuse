import { FETCH_FRIENDS } from '../actions/actions';

const INITIAL_STATE = { allFriends: [], selectedFriends: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      return { allFriends: action.payload, selectedFriends: [] };
    default:
      return state;
  }
};
