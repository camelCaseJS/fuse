// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var db = require('./User-db.js');
var User = require('./User.js');
var Photo = require('./User-Photos.js');
var expect = require('chai').expect;

var clearDB = (done => {
  db.sync({force: true})
    .then(table => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
});


describe('Photos table', () => {
  beforeEach(done => {
    clearDB(() => {
      users = [
          {name: 'joe'},
          {name: 'bob'},
          {name: 'gimbo'}
      ];
      User.bulkCreate(users).then(users => {
        done();
      });
    });
  });

  it('Should store photo links to the database', done => {
    User.find({where: {name: 'joe'}})
      .then(user => {
        return Photo.create({userId: user.id, link: '../../photos-db/joe/hi.jpg'});
      })
      .then(photo => {
        return Photo.find({where: {id: photo.id}});
      })
      .then(photo => {
        expect(photo).to.not.equal(null);
        expect(photo.link).to.equal('../../photos-db/joe/hi.jpg');
        done();
      });
  });

  it('Should not store links from deleted user', done => {
    User.find({where: {name: 'joe'}})
      .then(user => {
        return Photo.create({userId: user.id, link: '../../photos-db/joe/hi.jpg'});
      })
      .then(photo => {
        return User.destroy({where: {id: photo.userId}});
      })
      .then(user => {
        return Photo.find({where: {userId: user.id}});
      })
      .then(photo => {
        expect(photo).to.equal(null);
        done();
      });
  });
});