// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var db = require('./User-db.js');
var User = require('./User.js');
var Friendship = require('./User-Friends.js');
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


describe('Friends model', () => {
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

  it('Should add friendships to the database', done => {
    var ids = [];
    User.findAll({where: {
      $or: [{name: 'joe'}, {name: 'bob'}],
    },
    })
    .then(results => {
      expect(results.length).to.equal(2);
      ids.push(results[0].id);
      ids.push(results[1].id);
      return Friendship.create({userId: ids[0], friendId: ids[1]});
    })
    .then(friendship => {
      return Friendship.find({where: {userId: ids[1], friendId: ids[0]}});
    })
    .then(friendship => {
      expect(friendship).to.not.equal(null);
      expect(friendship.userId).to.equal(ids[1]);
      done();
    })
    .catch(err => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });

  it('Should be a reflexive table', done => {
    var ids = [];
    User.findAll({where: {
      $or: [{name: 'joe'}, {name: 'bob'}],
    },
    })
    .then(results => {
      expect(results.length).to.equal(2);
      ids.push(results[0].id);
      ids.push(results[1].id);
      return Friendship.create({userId: ids[0], friendId: ids[1]});
    })
    .then(friendship => {
      return Friendship.findAll({});
    })
    .then(friendships => {
      expect(friendships).to.not.equal(null);
      expect(friendships.length).to.equal(2);
      done();
    })
    .catch(err => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });

  it('Should not store friendships of deleted users', done => {
    var ids = [];
    User.findAll({where: {
      $or: [{name: 'joe'}, {name: 'bob'}],
    },
    })
    .then(results => {
      expect(results.length).to.equal(2);
      ids.push(results[0].id);
      ids.push(results[1].id);
      return Friendship.create({userId: ids[0], friendId: ids[1]});
    })
    .then(friendship => {
      return User.destroy({where: {id: ids[0]}});
    })
    .then(user => {
      return Friendship.findAll({where: {
        $or: [{userId: ids[0]}, {friendId: ids[1]}],
      },
      });
    })
    .then(friends => {
      expect(friends.length).to.equal(0);
      done();
    })
    .catch(err => {
      console.log(err);
      expect(err).to.not.exist;
      done();
    });
  });
});