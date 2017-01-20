export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';

export function updateRoute(newLocation) {
  return {
    type: UPDATE_ROUTE,
    payload: newLocation.pathname,
  };
}

export function userLogin() {
  console.log('user login in action creator');
  return {
    type: USER_LOGIN,
    payload: true,
  };
}

export function userLogout() {
  console.log('user logout in action creator');
  return {
    type: USER_LOGOUT,
    payload: null,
  };
}