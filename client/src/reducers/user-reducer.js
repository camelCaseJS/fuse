import { GET_USER_INFO } from '../actions/user-actions';

const INITIAL_STATE = {
  // userInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action, 'GETS TO USER REDUCER');
  switch (action.type) {
    case GET_USER_INFO: {
      // console.log(action, 'user REDUCER');
      return {
        ...state,
        userInfo: action.payload,
      };
    }

    default:
      return state;
  }
};

