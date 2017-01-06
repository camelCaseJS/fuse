// points to all other reducers

// FIRE ZE MISSLES

import { combineReducers } from 'redux';
import photos from './photos/reducers/reducers';
import friends from './friends/reducers/reducers';
import camera from './camera/reducers/reducers';

// const defaultReducer = (state = null, action) => {
//   return state;
// };

// const allReducers = Object.assign({}, photosReducers, friendsReducers, cameraReducers);
const rootReducer = combineReducers({ friends: friends });

export default rootReducer;

