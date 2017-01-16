import { combineReducers } from 'redux';
import { USER_LOGOUT } from '../Actions/SharedComponentsActions';

// import photos from './reducers/photos-reducer';
import Friends from '../Reducers/FriendsReducer';
// import search from './reducers/search-reducer';
// import camera from './reducers/camera-reducer';
// import router from './reducers/shared-components-reducer';

const AppReducer = combineReducers({ friends: Friends });


const RootReducer = (state, action) => {
  console.log('action type in root reducer');
  console.log(action.type);
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
