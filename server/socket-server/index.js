
const io = require('socket.io');

const startSocketServer = (server) => {
  const socketServer = io(server);
  const connections = [];

  socketServer.on('connection', (socket) => {
    console.log('SOCKET CONNECTED IN SERVER');
    connections.push(socket);
    socket.emit('check', { server: 'informations!' });
    socket.on('photo', (data) => {
      // connections.forEach((connectedSocket) => {
      //   if (connectedSocket !== socket) {
      //     connectedSocket.emit('photo', data);
      //   }
      console.log(data, 'data got back to server!');
    });

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
};

module.exports = startSocketServer;
