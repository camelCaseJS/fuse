import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import Paper from 'material-ui/Paper';

import NavBar from './nav-bar';

const styles = {
  left: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'max-content',
    width: '45%',
    margin: 8,
  },
  right: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'max-content',
    width: '45%',
    margin: 8,
  },
};

const Main = ({ right, left }) => (
  <div id="main">
    <NavBar />
    <div className="flex">
      <Paper style={styles.left} zDepth={2} >
        {left}
      </Paper>
      <Paper style={styles.right} zDepth={2} >
        {right}
      </Paper>
    </div>
  </div>
);

export default Main;
