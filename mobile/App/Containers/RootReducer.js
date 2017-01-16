import { combineReducers } from 'redux';

// import photos from './reducers/photos-reducer';
import Friends from '../Reducers/FriendsReducer';
// import search from './reducers/search-reducer';
// import camera from './reducers/camera-reducer';
// import router from './reducers/shared-components-reducer';

const RootReducer = combineReducers({ friends: Friends });

export default RootReducer;
