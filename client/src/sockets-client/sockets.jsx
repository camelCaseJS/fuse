
const userChannel = 'ryan';

const createSocket = () => {
  const myChannel = io.connect(`http://localhost:8000/${userChannel}`);

  myChannel.on('check', (data) => {
    console.log(data, 'data got to client!');
    myChannel.emit('send photo', { client: 'data' });
  });

  myChannel.on('from server', (data) => {
    console.log(data, '** data got to photo 1');
  });

  myChannel.on('from server DOS', (data) => {
    console.log(data, '&& data got to photo 2');
  });
};


export default createSocket;
