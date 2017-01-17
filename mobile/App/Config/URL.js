const base = 'http://localhost:8000';
const URL = {
  base,
  photos: `${base}/api/photos/`,
  users: `${base}/api/users/`,
  search: `${base}/api/users/search/`,
  userInfo: `${base}/api/users/userInfo`,
  token: `${base}/api/auth/facebook/token`,
  logout: `${base}/api/auth/logout`,
};

export default URL;
