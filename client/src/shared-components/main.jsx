import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import Paper from 'material-ui/Paper';

import NavBar from './nav-bar';

// const styles = { left: {
//   position: 'absolute',
//   display: 'inline',
//   bottom: 0,
//   left: 0,
//   margin: 10 },
//   right: {
//     position: 'absolute',
//     display: 'inline',
//     bottom: 0,
//     right: 0,
//     margin: 10 },
// };

const styles = {
  left: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'max-content',
    width: '45%',
    margin: 10,
    // left: 0,
  },
  right: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'max-content',
    width: '45%',
    margin: 10,
    // right: 0,
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


// const Main = ({ right, left }) => (
//   <div id="main">
//     <NavBar />
//       <GridList
//         cols={2}
//         cellHeight="auto"
//       >
//       <GridTile>
//         <Paper style={styles.left} zDepth={1} >
//         {left}
//         </Paper>
//       </GridTile>
//       <GridTile>
//         <Paper style={styles.right} zDepth={1} >
//           {right}
//         </Paper>
//       </GridTile>
//     </GridList>
//   </div>
// );

// const Main = ({ right, left }) => (
//   <div id="main">
//     <NavBar />
//     <GridList
//       cols={2}
//       cellHeight="auto"
//     >
//       <GridTile>
//         {left}
//       </GridTile>
//       <GridTile >
//         {right}
//       </GridTile>
//     </GridList>
//   </div>
// );

export default Main;
