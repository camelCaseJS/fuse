
const socketInit = require('socket.io');

const startSocketServer = (server) => {
  const io = socketInit(server);

  const photoNsp = io.of('/photoSocket');
  photoNsp.on('connection', (socket) => {
    console.log('connected to photo socket namespace');

    // emit namespace connection success
    photoNsp.emit('photo socket connect', 'connected to namespace: "/photoSocket"');
    // listen for join room request
    socket.on('join photo room', (data) => {
      const userPhotoRoom = `photoRoom:${data}`;
      // create new room base on user id
      socket.join(userPhotoRoom, () => {
        // emit room connection success
        photoNsp.in(userPhotoRoom).emit('photo room connected', `in photo room #${data.roomId}`);
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected from photo socket namespace');
    });
  });

  const friendNsp = io.of('/friendSocket');
  friendNsp.on('connection', (socket) => {
    console.log('connected to friend socket namespace');

    // emit namespace connection success
    friendNsp.emit('friend socket connect', 'connected to namespace: "/friendSocket"');
    // listen for join room request
    socket.on('join friend room', (data) => {
      const userfriendRoom = `friendRoom:${data}`;
      // create new room base on user id
      socket.join(userfriendRoom, () => {
        // emit room connection success
        friendNsp.in(userfriendRoom).emit('friend room connected', `in friend room #${data.roomId}`);
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected from photo socket namespace');
    });
  });
};

const userIdHasher = (userId) => {

};


module.exports.startSocketServer = startSocketServer;

module.exports.userIdHasher = userIdHasher;

