import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes';
import { userLogout, userLogin } from '../Actions/SharedComponentsActions';
import RoundedButton from '../Components/RoundedButton';
import Login from './Login';
import authenticate from '../Components/Authenicate';

// Styles
import styles from './Styles/SceneStyle';

class PresentationScreen extends Component {

  componentWillMount() {
    authenticate((authenicated) => {
      authenicated ? this.props.userLogin() : this.props.userLogout();
    });
  }

  renderNavButton() {

    return (

      <View>

        <RoundedButton onPress={NavigationActions.friends}>
          Friends
        </RoundedButton>

        <RoundedButton onPress={NavigationActions.camera}>
          Camera
        </RoundedButton>

        <RoundedButton onPress={NavigationActions.search}>
          Search
        </RoundedButton>

      </View>

    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <Image
          source={Images.background5}
          style={styles.backgroundImage}
          resizeMode="stretch" />

          <View style={styles.mainSection}>

          <View style={styles.centered}>
            <Image
              source={Images.fuseLogo}
              style={styles.smallLogo}
            />
          </View>

          <ScrollView style={styles.scrollContainer}>

          </ScrollView>

            { this.props.login ? this.renderNavButton() : <View /> }

          <View>

            <Login />

          </View>

        </View>

      </View>
    );
  }
}

PresentationScreen.propTypes = {
  login: PropTypes.bool.isRequired,
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, action) => {
  console.log('state');
  console.log(state);
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, { userLogout, userLogin })(PresentationScreen);
