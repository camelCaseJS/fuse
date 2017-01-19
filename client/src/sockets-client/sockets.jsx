const url = 'http://localhost:8000/';
// const friendsActions = require('../actions/friends-actions');

const myPhotoConnection = io('/photoSocket');
const myFriendsConnection = io('/friendSocket');


export function sendFriendRequest(friendFacebookId) {
  // const myFriendsConnection = io('/friendSocket');
  // console.log('inside send friend req');
  myFriendsConnection.emit('send friend request',
    { friendFacebookId });
}


// export function connectToNamespaces(userFBId) {
  // connect to the namespace '/photoSocket'
  // listen for connection success signal
  // myPhotoConnection.on('photo socket connect', (data) => {
  //   console.log(data);
  //   // emit join room request with user id to create custom rooms
  //   myPhotoConnection.emit('join photo room', { roomId: userFBId });
  //   // listen for room connect success signal
  //   myPhotoConnection.on('photo room connected', (photoRoomInfo) => {
  //     console.log(photoRoomInfo);
  //   });
  // });

  // myPhotoConnection.on('send to photos test', (photos) => {
  //   alert('SOME NEW PICS COMIN IN');
  //   console.log(photos, 'thru user photo room in photo nsp');
  // });

  // connect to the namespace '/friendSocket;
  // listen for connection success signal
//   myFriendsConnection.on('friend socket connect', (data) => {
//     console.log(data);
//     // emit join room request with user id to create custom rooms
//     myFriendsConnection.emit('join friend room', { roomId: userFBId });
//     // listen for room connect success signal
//     myFriendsConnection.on('friend room connected', (friendRoomInfo) => {
//       console.log(friendRoomInfo);
//     });
//   });

//   myFriendsConnection.on('new friend request', (newFriendSignal) => {
//     alert('AY SOMEONE TRYNA SLIDE IN YO DMS');
//     // friendsActions.fetchPendingFriends();
//     // console.log(newFriendSignal, 'thru user friends room in friends nsp');
//   });
// }
