import { AccessToken } from 'react-native-fbsdk';
import URL from '../Config/URL';
import { Actions as NavigationActions } from 'react-native-router-flux';

const authenticate = () => {
  const sendToken = (token) => {
    fetch(URL.token,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: '',
      },
    );
  };

  AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (data === null || data === undefined) {
        NavigationActions.presentationScreen();
      } else {
        sendToken(data.accessToken.toString());
      }
    });
};

export default authenticate;
