let users = [];

// {id: profile.id,
// token: token,
// name: profile.name.givenName,
// email: profile.emails[0].value}

users.findByID = (id, cb) => {
  this.forEach((user) => {
    if (user.id === id) {
      cb(user);
    } else {
      cb();
    }
  });
};

export default users;
