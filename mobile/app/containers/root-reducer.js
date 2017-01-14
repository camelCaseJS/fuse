import { combineReducers } from 'redux';

const defaultReducer = state => state;

// import photos from './reducers/photos-reducer';
// import friends from './reducers/friends-reducer';
// import search from './reducers/search-reducer';
// import camera from './reducers/camera-reducer';
// import router from './reducers/shared-components-reducer';

const rootReducer = combineReducers({ defaultReducer });

export default rootReducer;
