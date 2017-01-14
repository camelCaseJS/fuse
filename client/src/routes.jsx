// ze routes lives here
import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import Friends from './features/friends/containers/friends';
import Photos from './features/photos/containers/photos';
import Camera from './features/camera/containers/camera';
import Main from './shared-components/main';
import Search from './features/search/search';

import App from './shared-components/app';
import Login from './shared-components/login';

const FriendsRoute = () => (
  <Main
    left={<Friends />}
    right={<div/>}
  />
);

const CameraRoute = () => (
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
      component={FriendsRoute}
    />
    <Route
      path="search"
      component={Search}
    />
    <Route
      path="camera"
      component={CameraRoute}
    />
  </Route>
);
