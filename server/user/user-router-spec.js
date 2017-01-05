process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const db = require('../db/users/User-db.js');
const User = require('../db/users/User.js');
const Friendship = require('../db/users/User-Friends.js');


const clearDB = ((done) => {
  db.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});


describe('server', () => {
  beforeEach((done) => {
    clearDB(() => {
      const users = [
        { facebookId: '123',
          firstName: 'ant',
          lastName: 'a',
          profilePictureURL: 'test.com/a',
          email: '123@gmail.com' },
        { facebookId: '456',
          firstName: 'bat',
          lastName: 'b',
          profilePictureURL: 'test.com/b',
          email: '456@gmail.com' },
        { facebookId: '789',
          firstName: 'cat',
          lastName: 'c',
          profilePictureURL: 'test.com/c',
          email: '789@gmail.com' },
        { facebookId: '555',
          firstName: 'dog',
          lastName: 'd',
          profilePictureURL: 'test.com/d',
          email: '555@gmail.com' },
      ];
      User.bulkCreate(users).then(() => {
        done();
      });
      const ids = [2, 3, 4];

    });
  });

  it('should respond to GET requests for /user with a 200 status code', function(done) {
    request('http://localhost:8000/user/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should respond to POST requests for /user with a 200 status code', function(done) {
    request('http://localhost:8000/user/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://localhost:8000/user/', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://localhost:8000/user/', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://localhost:8000/user/', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /user/:id', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://localhost:8000/user/',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://localhost:8000/user/',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://localhost:8000/user/', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('Jono');
        expect(messages[0].message).to.equal('Do my bidding!');
        done();
      });
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });


});
