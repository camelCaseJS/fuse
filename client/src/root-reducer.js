// points to all other reducers

// FIRE ZE MISSLES

import { combineReducers } from 'redux';
import photosReducers from './photos-view/reducers/reducers';
import friendsReducers from './friends-view/reducers/reducers';
import cameraReducers from './camera-view/reducers/reducers';

const allReducers = Object.assign({}, photosReducers, friendsReducers, cameraReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer;
