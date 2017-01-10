const Promise = require('bluebird')
const dbHandler = require('./user-db-handler')


const userSearch = (req, res) => {
  var keys = req.params.query.split(' ');
  return Promise.all(keys.map((token) => {
    if(token.match('@')) {
      return dbHandler.emailSearch(token)
    }
    return dbHandler.nameSearch(token);
  }))
  .then((results) => {
    var users = []
    results.forEach((result) => {
      result.forEach((user) => {
        console.log('hello')
        users.push(user);
      });
    });
    res.send(users);
  }).catch((err) => {
    console.log(err);
    res.send(500);
  });
};

module.exports.userSearch = userSearch;