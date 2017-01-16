import { LoginButton, AccessToken } from 'react-native-fbsdk';
import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import styles from './Styles/SearchBarStyle';
import URL from '../Config/URL';

const sendToken = (token) => {
  console.log('URL.token', URL.token);
  fetch(URL.token,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: ``
    }
  ).then((response) => {
    console.log('response', response);
  });
}

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
                  sendToken(data.accessToken.toString());
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
