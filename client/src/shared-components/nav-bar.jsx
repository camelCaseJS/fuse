import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';

const NavBar = () =>

  (
    <AppBar
      title={
        <span>
          fuse
        </span>
      }
      iconElementLeft={<Link to={'/friends'}> view friends.</Link>}
      iconElementRight={<Link to={'/friends/Add'}>add friends.</Link>}
    />
  );


export default NavBar;

