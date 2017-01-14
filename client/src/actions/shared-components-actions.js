export const UPDATE_ROUTE = 'UPDATE_ROUTE';

export function updateRoute(newLocation) {
  return {
    type: UPDATE_ROUTE,
    payload: newLocation.pathname,
  };
}
