// ze routes lives here
import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import Friends from './features/friends/containers/friends';
import Photos from './features/photos/containers/photos';
import Camera from './features/camera/containers/camera';
import Main from './shared-components/main';
import CameraButton from './shared-components/camera-button';
import Search from './features/search/search';

import App from './shared-components/app';
import Login from './shared-components/login';

const CameraTemp = () => (
  <div>
    <div className="placeholder" />
    <CameraButton
      label="start camera"
      onClick={() => this.context.router.push('/camera')}
    />
  </div>
);

const FriendandCameraRoute = () => (
  <Main
    left={<Friends />}
    right={<Camera />}
  />
);


export default (
  <Route path="/" component={App}>
    <Route
      path="login"
      component={Login}
    />
    <Route
      path="photos"
      component={Photos}
    />
    <Route
      path="friends"
      component={FriendandCameraRoute}
    />
    <Route
      path="search"
      component={Search}
    />
    <Route
      path="camera"
      component={FriendandCameraRoute}
    />
  </Route>
);
