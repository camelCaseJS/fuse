
const io = require('socket.io');

const startSocketServer = (server) => {
  const socketServer = io(server);
  const connections = [];

  socketServer.on('connection', (socket) => {
    connections.push(socket);

    socket.on('photo', (data) => {
      connections.forEach((connectedSocket) => {
        if (connectedSocket !== socket) {
          connectedSocket.emit('photo', data);
        }
      });
    });

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
};

module.exports = startSocketServer;
