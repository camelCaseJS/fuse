// points to all other reducers

// FIRE ZE MISSLES

import { combineReducers } from 'redux';
import photosReducers from './photos/reducers/reducers';
import friendsReducers from './friends/reducers/reducers';
import cameraReducers from './camera/reducers/reducers';

const defaultReducer = (state = null, action) => {
  return state;
};

const allReducers = Object.assign(defaultReducer, photosReducers, friendsReducers, cameraReducers);
const rootReducer = combineReducers({ allReducers });

export default rootReducer;

