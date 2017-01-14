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
            initial key="Main View"
            component={PresentationScreen}
            title="Fuse"
          />
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
