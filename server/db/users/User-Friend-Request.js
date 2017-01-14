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

const FriendRequests = db.model('friendRequests');

FriendRequests.hooks('beforeCreate', (request) => {
  Friendship.find({ where: {
    userId: request.userId,
    friendId: request.requestId,
  }})
  .then((exists) => {
    if (exists) {
      throw new Error('That Friendship exists');
    }
    return request;
  });
});

FriendRequests.hooks('afterCreate', (request) => {
  FriendRequests.find({ where : {
    userId: request.requestId,
    requestId: request.userId,
  }})
  .then((matchingRequest) => {
    if(matchingRequest) {
      return FriendRequests.destroy({ where: {
        $or: [request, matchingRequest]
      }
      })
      .then(() => Friendship.create({ userId: request.userId, friendId: request.requestId }))
      .then((friendship) => {
        return [friendship, true];
      })
    } else {
      return [request, false];
    }
  })
})

