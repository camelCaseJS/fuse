import { USER_LOGIN, USER_LOGOUT } from '../Actions/SharedComponentsActions';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case USER_LOGIN: {
      return true;
    }

    case USER_LOGOUT: {
      return false;
    }

    default:
      return state;
  }
};
