import React, { Component, PropTypes } from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import Search from 'material-ui/svg-icons/action/search';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import CameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
  icons: {
    marginLeft: 20,
    marginRight: 20,
    color: 'FFFFFF',
    height: '36px',
    width: '36px',
  },
  iconHover: {
    marginLeft: 20,
    marginRight: 20,
    color: 'FFFFFF',
    height: '38px',
    width: '38px',
  },
  text: {
    marginLeft: 20,
    fontSize: 32,
    color: '#ffffff',
  },
  toolbar: {
    backgroundColor: '#666C7F',
  },
};

function increaseButtonSize() {
  this.style.height = '46px';
  this.style.width = '46px';
}

function decreaseButtonSize() {
  this.style.height = '36px';
  this.style.width = '36px';
}

// <Search
//   style={styles.icons}
//   onMouseEnter={increaseButtonSize}
//   onMouseLeave={decreaseButtonSize}
//   onTouchTap={() => { this.context.router.push('/search'); }}
// />

class NavBar extends Component {

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <ActionHome
            style={styles.icons}
            onMouseEnter={increaseButtonSize}
            onMouseLeave={decreaseButtonSize}
            onTouchTap={() => { this.context.router.push('/friends'); }}
          />

          <ToolbarTitle
            style={styles.text}
            text="fuse"
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <CameraEnhance
            style={styles.icons}
            onTouchTap={() => { this.context.router.push('/camera'); }}
            onMouseEnter={increaseButtonSize}
            onMouseLeave={decreaseButtonSize}
            className="cameraButton"
          />
          <ActionExitToApp
            style={styles.icons}
            onTouchTap={() => { window.location = 'api/auth/logout'; }}
            onMouseEnter={increaseButtonSize}
            onMouseLeave={decreaseButtonSize}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object };

export default NavBar;

