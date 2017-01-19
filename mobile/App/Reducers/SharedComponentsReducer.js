import { RECORD_TOKEN } from '../Actions/SharedComponentsActions';

const INITIAL_STATE = { token: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case RECORD_TOKEN: {
      return { token: action.payload };
    }

    default:
      return state;
  }
};
