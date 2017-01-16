import { LoginButton, AccessToken } from 'react-native-fbsdk';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styles from '../Components/Styles/RoundedButtonStyle';
import URL from '../Config/URL';
import { userLogout } from '../Actions/SharedComponentsActions';

const sendToken = (token) => {
  console.log('URL.token', URL.token);
  fetch(URL.token,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: '',
    },
  ).then((response) => {
    console.log('response', response);
  });
};

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

  userLogin() {
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        sendToken(data.accessToken.toString());
      });
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
              this.userLogin();
            }
          }
        }
        onLogoutFinished={() => this.userLogout()} />
    );
  }
}

Login.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default connect(null, { userLogout })(Login);
