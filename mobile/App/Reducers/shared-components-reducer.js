// import { SELECT_FRIEND } from '../../friends/actions/actions';
import { UPDATE_ROUTE } from '../actions/shared-components-actions';

const INITIAL_STATE = { pathname: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ROUTE: {
      return { pathname: action.payload };
    }
    default:
      return state;
  }
};
