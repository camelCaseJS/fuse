import { LoginButton } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import styles from '../Components/Styles/RoundedButtonStyle';
import URL from '../Config/URL';
import { userLogout, userLogin } from '../Actions/SharedComponentsActions';
import { fetchFriends } from '../Actions/FriendsActions';
import authenicate from '../Components/Authenicate';

class Login extends Component {

  userLogout() {
    console.log('user logout');
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
              this.props.userLogin();
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
  userLogin: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};

export default connect(null, { userLogout, userLogin, fetchFriends })(Login);
