// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const db = require('./User-db.js');
const User = require('./User.js');
const Photo = require('./User-Photos.js');

const clearDB = ((done) => {
  db.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});


describe('Photos table', () => {
  beforeEach((done) => {
    clearDB(() => {
      const users = [
          { name: 'joe' },
          { name: 'bob' },
          { name: 'gimbo' },
      ];
      User.bulkCreate(users).then(() => {
        done();
      });
    });
  });

  it('Should store photo links to the database', (done) => {
    User.find({ where: { name: 'joe' } })
      .then(user => Photo.create({ userId: user.id, link: '../../photos-db/joe/hi.jpg' }))
      .then(photo => Photo.find({ where: { id: photo.id } }))
      .then((photo) => {
        expect(photo).to.not.equal(null);
        expect(photo.link).to.equal('../../photos-db/joe/hi.jpg');
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.not.exist;
        done();
      });
  });

  it('Should not store links from deleted user', (done) => {
    User.find({ where: { name: 'joe'} })
      .then(user => Photo.create({ userId: user.id, link: '../../photos-db/joe/hi.jpg' }))
      .then(photo => User.destroy({ where: { id: photo.userId } }))
      .then(user => Photo.find({ where: { userId: user.id } }))
      .then((photo) => {
        expect(photo).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.not.exist;
        done();
      });
  });

  it('Should not store duplicate links', (done) => {
    const link = '../../photos-db/mint/hi.jpg';
    User.find({ where: { name: 'bob' } })
    .then(user => Photo.create({ userId: user.id, link }))
    .then(() => User.find({ where: { name: 'joe' } }))
    .then(user => Photo.create({ userId: user.id, link }))
    .then((photo) => {
      console.log('successfully created duplicate');
      expect(photo).to.not.exist;
      done();
    })
    .catch(() => {
      done();
    });
  });
});
