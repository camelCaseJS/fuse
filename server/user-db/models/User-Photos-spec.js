// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var db = require('./User-db.js');
var User = require('./User.js');
var Photo = require('./User-Photos.js');
var expect = require('chai').expect;

var clearDB = (done => {
    db.sync({force:true})
      .then(table => {
        done()
      })
      .catch(err => {
        console.log(err);
      });
  });


describe('User model', () => {
  beforeEach(done => {
    clearDB(() => {
      users = [
          {name: 'joe'},
          {name: 'bob'},
          {name: 'gimbo'}
        ];
      User.bulkCreate(users).then(users => {
        done();
      })
    })
  });
});