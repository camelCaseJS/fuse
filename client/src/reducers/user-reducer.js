import { GET_USER_INFO } from '../actions/user-actions';

const INITIAL_STATE = {
  userInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};

