import React from 'react';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Login = () => (
  <Card>
    <CardMedia
      overlay={<CardTitle title="Fuse" subtitle="Picture messaging app" />}
    >
      <img src="http://www.allmacwallpaper.com/get/iMac-21-inch-wallpapers/Abstract-blue-leaf-1920x1080/1995-9.jpg" alt="Fuse" />
    </CardMedia>
    <CardActions>
      <FlatButton
        label="Facebook"
        onTouchTap={() => { window.location = '/auth/facebook'; }}
      />
    </CardActions>
  </Card>
);

// Login.contextTypes = {
//   router: PropTypes.object,
// };

export default Login;
