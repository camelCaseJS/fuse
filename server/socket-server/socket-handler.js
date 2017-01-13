

const io = require('socket.io');

const openConnection = (userId) => {
  console.log(userId);
  // socket.on(channel, (data) => {
    // connections.forEach((connectedSocket) => {
    //   if (connectedSocket !== socket) {
    //     connectedSocket.emit('photo', data);
    //   }
    // console.log(data, 'data got to photo channel in server!');
  // });
};


const startSocketServer = (server) => {
  const socketServer = io(server);
  const connections = [];
  const userId = 'ryan';
  const userChannel = socketServer
    .of(`/${userId}`)
    .on('connection', (socket) => {
      console.log(`${userId}' has connected to socket channel`);
      connections.push(socket);
      socket.emit('check', { suh: 'doood' });
      socket.on('send photo', (data) => {
        console.log(data, 'data in server from send photo');
      });

      socket.emit('from server', {
        data: 'from',
        SERVER: 'thru /ryan using "socket" ',
      });

      userChannel.emit('from server DOS', {
        data: 'from',
        SERVER: 'thru /ryan using "userChannel" ',
      });

      socket.on('disconnect', () => {
        const index = connections.indexOf(socket);
        connections.splice(index, 1);
        console.log(`${userId} has disconnected from socket channel`);
      });
    });
};

module.exports.startSocketServer = startSocketServer;

module.exports.openConnection = openConnection;
