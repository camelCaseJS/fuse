// import { SELECT_FRIEND } from '../../friends/actions/actions';
import { UPDATE_ROUTE } from '../actions/actions';

const INITIAL_STATE = { location: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ROUTE: {
      return { location: action.payload };
    }
    default:
      return state;
  }
};
