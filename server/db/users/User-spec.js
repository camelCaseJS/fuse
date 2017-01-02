// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const db = require('./User-db.js');
const User = require('./User.js');
const expect = require('chai').expect;

const clearDB = ((done) => {
  db.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});


describe('User model', () => {
  beforeEach((done) => {
    clearDB(done);
  });

  it('Should be add users to the database', (done) => {
    User.create({ name: 'joe' })
      .then((user) => {
        expect(user.name).to.equal('joe');
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.not.exist;
        done();
      });
  });

  it('Should not allow duplicates of users', (done) => {
    User.create({ name: 'bob' })
      .then(() => User.create({ name: 'bob' }))
      .then(() => User.findAll({ where: { name: 'bob' } }))
      .then((users) => {
        expect(users.length).to.equal(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.not.exist;
        done();
      });
  });
});
