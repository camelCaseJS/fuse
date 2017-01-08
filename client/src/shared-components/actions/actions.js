export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';

export function changeRoute(route) {
  return {
    type: CHANGE_ROUTE,
    payload: route,
  };
}

export function updateRoute(newRoute) {
  return {
    type: UPDATE_ROUTE,
    payload: newRoute,
  };
}
