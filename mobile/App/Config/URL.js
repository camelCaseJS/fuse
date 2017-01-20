const base = 'http://10.8.23.102:8000';
const URL = {
  base,
  photos: `${base}/api/photos/`,
  users: `${base}/api/users/`,
  pending: `${base}/api/users/pending`,
  search: `${base}/api/users/search/`,
  userInfo: `${base}/api/users/userInfo`,
  token: `${base}/api/auth/facebook/token`,
  logout: `${base}/api/auth/logout`,
  destroyRequest: `${base}/api/users/friendRequest/destroyOne`,
  completeRequest: `${base}/api/users/friendRequest/completeOne`,
};

export default URL;
