module.exports = (req, res, next) => {
  if (req.user) {
    console.log('autenticated!');
    console.log(req.user);
    next();
  } else {
    console.log('not authenticated');
    res.redirect('/login');
  }
};
