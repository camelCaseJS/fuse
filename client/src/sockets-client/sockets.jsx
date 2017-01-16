const userChannel = 10208433383245426;

const url = 'http://localhost:8000/';

const myPhotoConnection = io('/photoSocket');
const myFriendsConnection = io('/friendSocket');

export function connectToNamespaces(userFBId) {
  // connect to the namespace '/photoSocket'
  // listen for connection success signal
  myPhotoConnection.on('photo socket connect', (data) => {
    console.log(data, 'photo data');
    // emit join room request with user id to create custom rooms
    myPhotoConnection.emit('join photo room', { roomId: userFBId });
    // listen for room connect success signal
    myPhotoConnection.on('photo room connected', (photoRoomInfo) => {
      console.log(photoRoomInfo);
    });
  });

  myPhotoConnection.on('send to photos test', (photos) => {
    console.log(photos, 'DATA GOT BACK THRU user photo room in photo nsp');
  });

  // connect to the namespace '/friendSocket;
  // listen for connection success signal
  myFriendsConnection.on('friend socket connect', (data) => {
    console.log(data);
    // emit join room request with user id to create custom rooms
    myFriendsConnection.emit('join friend room', { roomId: userFBId });
    // listen for room connect success signal
    myFriendsConnection.on('friend room connected', (friendRoomInfo) => {
      console.log(friendRoomInfo);
    });
  });

  // myFriendsConnection.on('new friend request');
}

// export function connectToPhotosNamespace(userFBId) {
//   // connect to the namespace '/photoSocket'
//   // listen for connection success signal
//   myPhotoConnection.on('photo socket connect', (data) => {
//     console.log(data);
//     // emit join room request with user id to create custom rooms
//     myPhotoConnection.emit('join photo room', { roomId: userFBId });
//     // listen for room connect success signal
//     myPhotoConnection.on('photo room connected', (photoRoomInfo) => {
//       console.log(photoRoomInfo);
//     });
//   });

//   myPhotoConnection.on('send to photos test', (photos) => {
//     console.log(photos, 'DATA GOT BACK THRU user photo room in photo nsp');
//   });
// }

// export function connectToFriendsNamespace(userFBId) {
//   // connect to the namespace '/friendSocket;
//   // listen for connection success signal
//   myFriendsConnection.on('friend socket connect', (data) => {
//     console.log(data);
//     // emit join room request with user id to create custom rooms
//     myFriendsConnection.emit('join friend room', { roomId: userFBId });
//     // listen for room connect success signal
//     myFriendsConnection.on('friend room connected', (friendRoomInfo) => {
//       console.log(friendRoomInfo);
//     });
//   });

//   // myFriendsConnection.on('new friend request');
// }

export function sendFriendRequest(friendFacebookId) {
  // const myFriendsConnection = io('/friendSocket');
  console.log('inside send friend req');
  myFriendsConnection.emit('send friend request',
    { friendFacebookId });
}

myPhotoConnection.on('send to photos test', (data) => {
  console.log(data, 'inside from photos nsp client side');
});
// export function()
