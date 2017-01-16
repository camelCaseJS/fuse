const base = 'http://localhost:8000';
const URL = {
  base,
  photos: `${base}/api/photos/`,
  users: `${base}/api/users/`,
  userInfo: `${base}/api/users/userInfo`,
  token: `${base}/api/auth/facebook/token`,
};

export default URL;
