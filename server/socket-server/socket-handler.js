const socketInit = require('socket.io');


const startSocketServer = (server) => {
  const io = socketInit(server);
  const photoNsp = io.of('/photoSocket');
  const friendNsp = io.of('/friendSocket');

  photoNsp.on('connection', (socket) => {
    console.log('connected to photo socket namespace');
    // emit namespace connection success
    // photoNsp.emit('photo socket connect', 'connected to namespace: "/photoSocket"');
    // listen for join room request
    socket.on('join photo room', (data) => {
      const userPhotoRoom = `photoRoom:${data.roomId}`;
      // create new room base on user id
      if (socket.rooms[`photoRoom:${data.roomId}`] === undefined) {
        socket.join(userPhotoRoom, () => {
          // emit room connection success
          photoNsp.in(userPhotoRoom).emit('photo room connected', `joined room "${userPhotoRoom}"`);
        });
      }
    });

    socket.on('send new photo', (data) => {
      console.log(data, 'data through send photo request function');
      photoNsp.in(`photoRoom:${data}`).emit('new photo update', 'BACK TO CLIENT THRU NSP/ROOM');
    });

    socket.on('disconnect', () => {
      console.log('disconnected from photo socket namespace');
    });
  });

  // console.log(friendNsp);
  friendNsp.on('connection', (socket) => {
    console.log('connected to friend socket namespace');
    // emit namespace connection success
    // friendNsp.emit('friend socket connect', 'connected to namespace: "/friendSocket"');

    // listen for join room request
    socket.on('join friend room', (data) => {
      const userFriendRoom = `friendRoom:${data.roomId}`;
      if (socket.rooms[`friendRoom:${data.roomId}`] === undefined) {
        // create new room base on user id
        socket.join(userFriendRoom, () => {
          // emit room connection success
          friendNsp.in(userFriendRoom).emit('friend room connected', `joined room "${userFriendRoom}"`);
        });
      }
    });

    socket.on('send friend request', (object) => {
      console.log(object.sender, `emitting through friendRoom:${object.receiver.facebookId}`);
      friendNsp.in(`friendRoom:${object.receiver.facebookId}`).emit('new friend request', object.sender);
    });

    socket.on('update friend request', (object) => {
      console.log('===== ' , object.receiver, object.sender, 'inside socket server');
      friendNsp.in(`friendRoom:${object.receiver.facebookId}`).emit('new friend', object.sender);
      friendNsp.in(`friendRoom:${object.sender.facebookId}`).emit('new friend', object.receiver);
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

