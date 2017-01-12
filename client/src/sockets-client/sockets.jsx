
const createSocket = () => {
  const socket = io.connect('http://localhost:8000');
  socket.on('check', (data) => {
    console.log(data, 'data got to client!');
    socket.emit('photo', { client: 'data' });
  });
};

export default createSocket;
