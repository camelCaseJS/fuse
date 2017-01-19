import { LoginButton } from 'react-native-fbsdk';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from '../Components/Styles/RoundedButtonStyle';
import URL from '../Config/URL';
import { userLogout } from '../Actions/SharedComponentsActions';
import { fetchFriends } from '../Actions/FriendsActions';
import authenicate from '../Components/Authenicate';

class Login extends Component {

  userLogout() {
    fetch(URL.logout, { method: 'GET' })
    .then(() => {
      console.log('user logut');
      // User Logout Action to reset to INITIAL STATE
      this.props.userLogout();
      })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <LoginButton
        style={styles.facebookButton}
        publishPermissions={['publish_actions']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              authenicate();
            }
          }
        }
        onLogoutFinished={() => this.userLogout()} />
    );
  }
}

Login.propTypes = {
  userLogout: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

export default connect(null, { userLogout, fetchFriends })(Login);
