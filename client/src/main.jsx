import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import NavBar from './shared-components/nav-bar';
const Main = ({ right, left }) => (
  <div id="main">
    <NavBar />
    <GridList
      cols={2}
      cellHeight="auto"
    >
      <GridTile>
        {left}
      </GridTile>
      <GridTile >
        {right}
      </GridTile>
    </GridList>
  </div>
);

export default Main;
