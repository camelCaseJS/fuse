// ze routes lives here
import React from 'react';
import { Route } from 'react-router';
import Friends from './friends/containers/friends';
import Photos from './photos/containers/photos';
import Camera from './camera/containers/camera';

import App from './shared-components/app';
import Login from './shared-components/login';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="photos" component={Photos} />
    <Route path="friends" component={Friends} />
    <Route path="camera" component={Camera} />
  </Route>
);
