// ze routes lives here
import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import Friends from './features/friends/containers/friends';
import Photos from './features/photos/containers/photos';
import Camera from './features/camera/containers/camera';
import Main from './shared-components/main';
import SearchFriends from './features/search/searchFriends';

import App from './shared-components/app';
import Login from './shared-components/login';

const FriendsRoute = () => (
  <Main
    left={<Friends />}
    right={<SearchFriends />}
  />
);

const CameraRoute = () => (
  <Main
    left={<Friends />}
    right={<Camera />}
  />
);

const SearchRoute = () => (
  <Main
    left={<Friends />}
    right={<SearchFriends />}
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
      component={SearchRoute}
    />
    <Route
      path="camera"
      component={CameraRoute}
    />
  </Route>
);
