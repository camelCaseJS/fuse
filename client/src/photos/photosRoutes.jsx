import React from 'react';
import { Route } from 'react-router';

import Photos from './containers/photos';

const PhotosRoutes = () => {

  return (
    <Route path="" component={Photos} />
  );
};


export default PhotosRoutes;
