import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
// https://github.com/aksonov/react-native-router-flux
import Styles from './Styles/NavigationContainerStyle';
// Leave drawer out for now, this is the menu navivation view
// import NavigationDrawer from './NavigationDrawer';
// import NavItems from './nav-items';
// import CustomNavBar from '../Navigation/CustomNavBar';

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen';
import Friends from '../Containers/Friends';
import Photos from '../Containers/Photos';
import Search from '../Containers/Search';
import Camera from '../Containers/Camera';

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="drawerChildrenWrapper"
          navigationBarStyle={Styles.navBar}
          titleStyle={Styles.title}
          leftButtonIconStyle={Styles.leftButton}
          rightButtonTextStyle={Styles.rightButton}
        >
          <Scene
            key="presentationScreen"
            component={PresentationScreen}
            title="Fuse"
          />
          <Scene
            key="friends"
            component={Friends}
            title="Friends"
          />
          <Scene
            initial key="camera"
            component={Camera}
            title="Fuse"
          />
          <Scene
            key="photos"
            component={Photos}
            title="Fuse"
          />
          <Scene
            key="search"
            component={Search}
            title="Fuse"
          />
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
