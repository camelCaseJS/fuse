import { FETCH_FRIENDS, SELECT_FRIEND, UNSELECT_ALL_FRIENDS, GET_USER_INFO, SWITCH_TAB, FETCH_PENDING_FRIENDS, DESTROY_FRIEND_REQUEST, COMPLETE_FRIEND_REQUEST } from '../Actions/FriendsActions';


// NEED TO PUT USER INFO INTO STATE OF ANY COMPONENT THAT USES GETINFO
const INITIAL_STATE = {
  allFriends: [],
  pendingFriends: [],
  lastSelectedFriend: {},
  userInfo: {},
  tabIndex: 0,
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
      return {
        ...state,
        userInfo: action.payload,
      };
    }

    case SWITCH_TAB: {
      return {
        ...state,
        tabIndex: action.payload,
      };
    }

    case FETCH_PENDING_FRIENDS : {
      return {
        ...state,
        pendingFriends: action.payload,
      };
    }

    case DESTROY_FRIEND_REQUEST : {
      const newPendingFriends = state.pendingFriends.filter(friend => friend.id !== action.payload);
      return {
        ...state,
        pendingFriends: newPendingFriends,
      };
    }

    case COMPLETE_FRIEND_REQUEST : {
      const newPendingFriends = state.pendingFriends.filter(friend => friend.id !== action.payload);
      return {
        ...state,
        pendingFriends: newPendingFriends,
      };
    }

    default:
      return state;
  }
};
