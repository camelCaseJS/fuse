import React from 'react';
import { Route } from 'react-router';

import Friends from './containers/friends';

const FriendsRoutes = () => {

  return (
    <Route path="" component={Friends} />
  );
};


export default FriendsRoutes;
