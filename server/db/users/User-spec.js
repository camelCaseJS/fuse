// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// const loadProcessEnv = require('../../middleware/process-env-variables')();

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
    User.create({
      facebookId: '12345',
      firstName: 'jake',
      lastName: 'theDog',
      email: 'notReal@gmail.com',
      profilePictureURL: 'http://vignette3.wikia.nocookie.net/chroniclesofillusion/images/4/40/Jake_the_dog_mod_3.png/revision/latest?cb=20130809080456',
    })
      .then((user) => {
        expect(user.facebookId).to.equal('12345');
        expect(user.firstName).to.equal('jake');
        expect(user.lastName).to.equal('theDog');
        expect(user.email).to.equal('notReal@gmail.com');
        expect(user.profilePictureURL).to.equal('http://vignette3.wikia.nocookie.net/chroniclesofillusion/images/4/40/Jake_the_dog_mod_3.png/revision/latest?cb=20130809080456');
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.not.exist;
        done();
      });
  });

  it('Should not allow duplicates of users', (done) => {
    User.create({
      facebookId: '54321',
      email: 'notReal@gmail.com',
    })
      .then(() => User.create({ facebookId: '54321',
        email: 'notReal@gmail.com',
      }))
      .then(() => User.findAll({ where: { facebookId: '54321' } }))
      .then((users) => {
        expect(users.length).to.equal(1);
        done();
      })
      .catch((err) => {
        done();
      });
  });
});
