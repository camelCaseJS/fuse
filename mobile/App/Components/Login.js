import { LoginButton, AccessToken } from 'react-native-fbsdk';
import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import styles from './Styles/SearchBarStyle';

var Login = React.createClass({
  render: function() {
    return (
      <LoginButton
        // style={styles.container}
        publishPermissions={["publish_actions"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  alert(data.accessToken.toString())
                }
              )
            }
          }
        }
        onLogoutFinished={() => alert("logout.")}/>
    );
  },
});

export default Login;
