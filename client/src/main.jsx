import React from 'react';
import NavBar from './shared-components/nav-bar';
import { GridList, GridTile } from 'material-ui/GridList';

const Main = ({right, left}) => (
  <div>
    <NavBar />
    <GridList cols={2}>
      <GridTile>
      {left}
      </GridTile>
      <GridTile>
        {right}
      </GridTile>
    </GridList>
  </div>
);

export default Main;
