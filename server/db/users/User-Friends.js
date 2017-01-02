const db = require('./User-db.js');
const User = require('./User.js');

/*
Friendship is a reflexive relationship between users,
users can only be friends with each other once
*/

User.belongsToMany(User, {
  as: 'friends',
  through: 'friendship',
  unique: true,
  onDelete: 'cascade',
  hooks: true,
});


const Friendship = db.model('friendship');

// create reflexive property
Friendship.hook('afterCreate', (user) => {
  const reflexive = {
    friendId: user.userId,
    userId: user.friendId,
  };
  return Friendship.find({ where: reflexive })
    .then((friend) => {
      if (!friend) {
        return Friendship.create(reflexive);
      }
      return null;
    });
});

Friendship.hook('afterDestroy', (user) => {
  const reflexive = {
    friendId: user.userId,
    userId: user.friendId,
  };
  return Friendship.find({ where: reflexive })
    .then((friend) => {
      if (friend) {
        return Friendship.destroy({ where: reflexive });
      }
      return user;
    });
});

module.exports = Friendship;
