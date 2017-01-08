// points to all other reducers

// FIRE ZE MISSLES

import { combineReducers } from 'redux';
import photos from './photos/reducers/reducers';
import friends from './friends/reducers/reducers';
import camera from './camera/reducers/reducers';
import router from './shared-components/reducers/reducers';

const rootReducer = combineReducers({ friends, camera, photos, router });

export default rootReducer;

