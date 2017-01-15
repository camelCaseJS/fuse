const userChannel = 10208433383245426;

const url = 'http://localhost:8000/';

export function connectToPhotosNamespace(userFBId) {
  // connect to the namespace '/photoSocket'
  const myPhotoConnection = io('/photoSocket');

  // listen for connection success signal
  myPhotoConnection.on('photo socket connect', (data) => {
    console.log(data);
    // emit join room request with user id to create custom rooms
    myPhotoConnection.emit('join photo room', { roomId: userFBId });
    // listen for room connect success signal
    myPhotoConnection.on('photo room connected', (data) => {
      console.log(data);
    });
  });

}

export function connectToFriendsNamespace(userFBId) {
  // connect to the namespace '/photoSocket;
  const myFriendsConnection = io('/friendSocket');

  // listen for connection success signal
  myFriendsConnection.on('friend socket connect', (data) => {
    console.log(data);
    // emit join room request with user id to create custom rooms
    myFriendsConnection.emit('join friend room', { roomId: userFBId });
    // listen for room connect success signal
    myFriendsConnection.on('friend room connected', (data) => {
      console.log(data);
    });
  });
}

