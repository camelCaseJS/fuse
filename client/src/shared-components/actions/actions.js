export const UPDATE_ROUTE = 'UPDATE_ROUTE';

export function updateRoute(newRoute) {
  return {
    type: UPDATE_ROUTE,
    payload: newRoute,
  };
}
