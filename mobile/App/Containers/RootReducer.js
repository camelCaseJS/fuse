import { combineReducers } from 'redux';
import { USER_LOGOUT } from '../Actions/SharedComponentsActions';

import Photos from '../Reducers/PhotosReducer';
import Friends from '../Reducers/FriendsReducer';
// import search from './reducers/search-reducer';
// import camera from './reducers/camera-reducer';
import Login from '../Reducers/SharedComponentsReducer';

const AppReducer = combineReducers({
  friends: Friends,
  login: Login,
  photos: Photos,
});

const RootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
