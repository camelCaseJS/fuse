var db = require('./User-db.js');
var User = require ('./User.js');

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



var Friendship = db.model('friendship');
//create reflexive property
Friendship.hook('afterCreate', (user, options) => {
  var reflexive = {
    friendId: user.userId,
    userId: user.friendId,
  };
  return Friendship.find({where: reflexive})
    .then(friends => {
      if (!friends) {
        return Friendship.create(reflexive);
      }
    });
});

module.exports = Friendship;