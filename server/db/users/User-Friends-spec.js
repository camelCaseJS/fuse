// During the test the env variable is set to test
const loadProcessEnv = require('../../middleware/process-env-variables')();

const expect = require('chai').expect;
const db = require('./User-db.js');
const User = require('./User.js');
const Friendship = require('./User-Friends.js');


const clearDB = ((done) => {
  db.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});


describe('Friends model', () => {
  beforeEach((done) => {
    clearDB(() => {
      const users = [
        { facebookId: '123',
          email: '123@gmail.com' },
        { facebookId: '456',
          email: '456@gmail.com' },
        { facebookId: '789',
          email: '789@gmail.com' },
      ];
      User.bulkCreate(users).then(() => {
        done();
      });
    });
  });

  it('Should add friendships to the database', (done) => {
    const ids = [];
    User.findAll({ where: {
      $or: [{ facebookId: '123' }, { facebookId: '456' }],
    },
    })
    .then((results) => {
      expect(results.length).to.equal(2);
      ids.push(results[0].id);
      ids.push(results[1].id);
      return Friendship.create({ userId: ids[0], friendId: ids[1] });
    })
    .then(() => Friendship.find({ where: { userId: ids[1], friendId: ids[0] } }))
    .then((friendship) => {
      expect(friendship).to.not.equal(null);
      expect(friendship.userId).to.equal(ids[1]);
      done();
    })
    .catch((err) => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });

  it('Should be a reflexive table after adding a friendship', (done) => {
    const ids = [];
    User.findAll({ where: {
      $or: [{ facebookId: '123' }, { facebookId: '456' }],
    },
    })
    .then((users) => {
      expect(users.length).to.equal(2);
      ids.push(users[0].id);
      ids.push(users[1].id);
      return Friendship.create({ userId: ids[0], friendId: ids[1] });
    })
    .then(() => Friendship.findAll({}))
    .then((friendships) => {
      expect(friendships).to.not.equal(null);
      expect(friendships.length).to.equal(2);
      done();
    })
    .catch((err) => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });

  it('Should be a reflexive table after removing a friendship', (done) => {
    const ids = [];
    User.findAll({})
    .then((users) => {
      ids.push(users[0].id);
      ids.push(users[1].id);
      ids.push(users[2].id);
      const mkFriends = [
        { userId: ids[0], friendId: ids[1] },
        { userId: ids[1], friendId: ids[2] },
      ];
      return Friendship.bulkCreate(mkFriends);
    })
    .then((friendships) => {
      expect(friendships.length).to.equal(2);
      return Friendship.destroy({ where: { userId: friendships[0].id } });
    })
    .then(() => Friendship.findAll({}))
    .then((friendships) => {
      expect(friendships.length).to.equal(2);
      done();
    });
  });

  it('Should not store friendships of deleted users', (done) => {
    const ids = [];
    User.findAll({ where: {
      $or: [{ facebookId: '123' }, { facebookId: '456' }],
    },
    })
    .then((users) => {
      expect(users.length).to.equal(2);
      ids.push(users[0].id);
      ids.push(users[1].id);
      return Friendship.create({ userId: ids[0], friendId: ids[1] });
    })
    .then(() => User.destroy({ where: { id: ids[0] } }))
    .then(() => Friendship.findAll({ where: {
      $or: [{ userId: ids[0] }, { friendId: ids[0] }] },
    }))
    .then((friends) => {
      expect(friends.length).to.equal(0);
      done();
    })
    .catch((err) => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });
});
