process.env.NODE_ENV = 'test';

const db = require('./User-db.js');
const User = require('./User.js');
const Friendship = require('./User-Friends.js');


User.belongsToMany(User, {
  as: 'requests',
  through: 'friendRequests',
  unique: true,
  onDelete: 'cascade',
  hooks: true,
});

/*
Rather than adding friendships directly one adds to to friend requests,
if a matching friend request exists, both requests are deleted and a new
friendship is added to the friendship table
*/

const FriendRequests = db.model('friendRequests');


FriendRequests.hook('beforeCreate', (request) => {
  Friendship.find({ where: {
    userId: request.userId,
    friendId: request.requestId,
  } })
  .then((exists) => {
    if (exists) {
      console.error('That Friendship exists');
    }
    return request;
  });
});

// adds a deleted property to check if the new friendship now exists
FriendRequests.hook('afterCreate', request => (
  FriendRequests.find({
    where: {
      userId: request.requestId,
      requestId: request.userId,
    },
  })
  .then((matchingRequest) => {
    if (matchingRequest) {
      return FriendRequests.destroy({
        where: {
          $or: [
            { requestId: request.requestId, userId: request.userId },
            { requestId: matchingRequest.requestId, userId: matchingRequest.userId },
          ],
        },
      })
      .then(() => Friendship.create({ userId: request.userId, friendId: request.requestId }))
      .then(() => {
        request.deleted = true;
      });
    }
    request.deleted = false;
  })
));

module.exports = FriendRequests;
