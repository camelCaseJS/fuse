import { FETCH_FRIENDS, FETCH_PENDING_FRIENDS, SELECT_FRIEND, UNSELECT_ALL_FRIENDS, HANDLE_TAB_SWITCH, DESTROY_FRIENDSHIPS, DESTROY_ONE_FRIEND_REQUEST, COMPLETE_ONE_FRIEND_REQUEST, DESTROY_RECEIVED_PENDING, DESTROY_SENT_PENDING } from '../actions/friends-actions';


// NEED TO PUT USER INFO INTO STATE OF ANY COMPONENT THAT USES GETINFO
const INITIAL_STATE = {
  allFriends: [],
  lastSelectedFriend: {},
  userInfo: {},
  slideIndex: 0,
  pendingFriends: [],
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

    case FETCH_PENDING_FRIENDS:
      // Creates an object with all properties copied from state
      // Then replaces allFriends with action.payload
      // console.log(action.payload);
      return { ...state, pendingFriends: action.payload };

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

    // case GET_USER_INFO: {
    //   return {
    //     ...state,
    //     userInfo: action.payload,
    //   };
    // }

    case HANDLE_TAB_SWITCH: {
      return {
        ...state,
        slideIndex: action.payload,
      };
    }

    case DESTROY_FRIENDSHIPS: {
      return {
        ...state,
        allFriends: action.payload,
      };
    }

    case DESTROY_SENT_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DESTROY_RECEIVED_PENDING: {
      return {
        ...state,
        pending: action.payload,
      };
    }

    case DESTROY_ONE_FRIEND_REQUEST: {
      return {
        ...state,

      };
    }

    case COMPLETE_ONE_FRIEND_REQUEST: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
