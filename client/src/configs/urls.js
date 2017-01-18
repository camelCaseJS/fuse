const base = 'http://localhost:8000';
const url = {
  base,
  photos: `${base}/api/photos/`,
  users: `${base}/api/users/`,
  userInfo: `${base}/api/users/userInfo`,
  search: `${base}/api/users/search/`,
  pending: `${base}/api/users/pending`,
};

export default url;
