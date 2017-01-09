import React, { Component, PropTypes } from 'react';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

class Friends extends Component {
  render() {
    return (
      <Main
        left={<FriendsList />}
        right={<div>
          <div className="placeholder" />
          <CameraButton
          label="start camera"
          onClick={() => this.context.router.push('/camera')}
          />
        </div>}
      />
    );
  }
}

Friends.contextTypes = {
  router: PropTypes.object };

export default Friends;
