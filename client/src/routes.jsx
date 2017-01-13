// ze routes lives here
import React from 'react';
import { Route } from 'react-router';
import Friends from './features/friends/containers/friends';
import Photos from './features/photos/containers/photos';
import Camera from './features/camera/containers/camera';
import AddFriends from './features/friends-add/friendsAdd';

import App from './shared-components/app';
import Login from './shared-components/login';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="photos" component={Photos} />
    <Route path="friends" component={Friends} />
    <Route path="search" component={AddFriends} />
    <Route path="camera" component={Camera} />
  </Route>
);
