const Promise = require('bluebird');
const Photos = require('../db/users/User-Photos');
const Friends = require('../db/users/User-Friends');


const friendVerify = Promise.method(req =>
  Friends.find({ where: {
    userId: req.user.id,
    friendId: parseInt(req.params.user, 10),
  } })
  .then((friend) => {
    if (friend) return true;
    return false;
  }));

const findUserLinks = Promise.method(id =>
  Photos.findAll({ where: {
    userId: id,
  } }));

// input: request
const findAllPhotos = Promise.method((req) => {
  if (!req.user || !req.user.id) {
    throw new Error('no user in request');
  }
  let query = [{ userId: req.user.id }];
  return Friends.findAll({ where: {
    userId: req.user.id,
  } })
  .then((friends) => {
    query = query.concat(friends.map(friend => ({ userId: friend.friendId })));
    return Photos.findAll({ where: {
      $or: query,
    } });
  });
});

const addPhoto = Promise.method((req, link) => {
  if (!req.user || !req.user.id) {
    throw new Error('no user in request');
  }
  return Photos.create({
    userId: req.user.id,
    link,
  });
});

const getLink = link => Photos.find({ where: { link } });

module.exports.getLink = getLink;

module.exports.friendVerify = friendVerify;

module.exports.findUserLinks = findUserLinks;

module.exports.findAllPhotos = findAllPhotos;

module.exports.addPhoto = addPhoto;
