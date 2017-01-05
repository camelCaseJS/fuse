// ze routes lives here
import React from 'react';
import { Route } from 'react-router';

import PhotosRouter from './photos-view/photosRouter';
import FriendsRouter from './friends-view/friendsRouter';
import CameraRouter from './camera-view/cameraRouter';
import App from './app';

export default (
  <Route path="/" component={App}>
    <Route path="photos" component={PhotosRouter} />
    <Route path="friends" component={FriendsRouter} />
    <Route path="camera" component={CameraRouter} />
  </Route>
);
