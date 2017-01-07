import { FETCH_FRIENDS } from '../actions/actions';

const INITIAL_STATE = { all: [], selected: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      return { all: action.payload, selected: [] };
    default:
      return state;
  }
};
