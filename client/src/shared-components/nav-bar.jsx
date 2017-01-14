import React, { Component, PropTypes } from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import CameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import AppBar from 'material-ui/AppBar';

const iconStyles = {
  height: '36px',
  width: '36px' };

class NavBar extends Component {

  leftButtons() {
    return (
      <div>
        <ActionHome
          style={iconStyles}
          onTouchTap={() => { this.context.router.push('/friends'); }}
        />
        <ActionFace
          style={iconStyles}
          onTouchTap={() => { this.context.router.push('/search'); }}
        />
      </div>
    );
  }

  rightButtons() {
    return (
      <div>
        <CameraEnhance
          style={iconStyles}
          onTouchTap={() => { this.context.router.push('/camera'); }}
        />
        <ActionExitToApp
          style={iconStyles}
          onTouchTap={() => { window.location = 'api/auth/logout'; }}
        />
      </div>
    );
  }

  render() {
    return (
      <AppBar
        title={<span> fuse </span>}
        iconElementLeft={this.leftButtons()}
        iconElementRight={this.rightButtons()}
      />
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object };

export default NavBar;

