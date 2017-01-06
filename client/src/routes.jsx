// ze routes lives here
import React from 'react';
import { Route } from 'react-router';

import PhotosRoutes from './photos/photosRoutes';
import FriendsRoutes from './friends/friendsRoutes';
import CameraRoutes from './camera/cameraRoutes';
import App from './shared-components/app';
import Login from './shared-components/login';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="photos" component={PhotosRoutes} />
    <Route path="friends" component={FriendsRoutes} />
    <Route path="camera" component={CameraRoutes} />
  </Route>
);
