// ze routes lives here
import React from 'react';
import { Route } from 'react-router';

import PhotosRoutes from './photos-view/photosRoutes';
import FriendsRoutes from './friends-view/friendsRoutes';
import CameraRoutes from './camera-view/cameraRoutes';
import App from './app';

export default (
  <Route path="/" component={App}>
    <Route path="photos" component={PhotosRoutes} />
    <Route path="friends" component={FriendsRoutes} />
    <Route path="camera" component={CameraRoutes} />
  </Route>
);
