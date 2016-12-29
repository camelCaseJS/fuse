// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var db = require('./User-db.js');
var User = require('./User.js');
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
    clearDB(done)
  });

  it('Should be add users to the database', done => {
    User.create({name:'joe'})
      .then(user => {
        expect(user.name).to.equal('joe');
        done();
      }).catch(err => {
        console.log(err);
      })
  })

  it('Should not allow duplicates of users', () => {
    User.create({name: 'bob'})
      .then(user => {
        return User.create({name: 'bob'})
      })
      .then(user => {
        return User.findAll({where:{name:'bob'}})
      })
      .then(users => {
        expect(users.length).to.equal(1);
        done();
      })
  })
});