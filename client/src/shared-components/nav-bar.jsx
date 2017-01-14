import React, { Component, PropTypes } from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import CameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
  icons: {
    marginLeft: 20,
    marginRight: 20,
    height: '36px',
    width: '36px' },
  text: {
    marginLeft: 20,
    fontSize: 32,
    color: '#ffffff',
  },
  toolbar: {
    backgroundColor: '#2cc8f7',
  },
};

class NavBar extends Component {

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <ActionHome
            style={styles.icons}
            onTouchTap={() => { this.context.router.push('/friends'); }}
          />
          <ActionFace
            style={styles.icons}
            onTouchTap={() => { this.context.router.push('/search'); }}
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
          />
          <ActionExitToApp
            style={styles.icons}
            onTouchTap={() => { window.location = 'api/auth/logout'; }}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object };

export default NavBar;

