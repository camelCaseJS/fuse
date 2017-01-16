export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const USER_LOGOUT = 'USER_LOGOUT';

export function updateRoute(newLocation) {
  return {
    type: UPDATE_ROUTE,
    payload: newLocation.pathname,
  };
}

export function userLogout() {
  console.log('user logout in action creator');
  return {
    type: USER_LOGOUT,
    payload: null,
  };
}
