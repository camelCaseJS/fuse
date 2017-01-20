module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else if(process.env.TEST_USER) {
    req.user = process.env.TEST_USER;
    next();
  } else {
    console.log('not authenticated');
    res.redirect(401, '/login');
  }
};
