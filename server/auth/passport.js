process.env.NODE_ENV = 'development';

import passport from 'passport';
// Strategy applies to facebook, if other strategies are used need refactor
import { Strategy } from 'passport-facebook';
import apiKeys from './oauth-keys';

const User = require('../db/users/User');
const db = require('../db/users/User-db.js');

/* Determine what data from the user object to
 * store in the session, in this case req.session.passport.user */
passport.serializeUser((user, done) => {
  console.log(`serializeUser ${user.id}`);
  done(null, user.id);
});

/* Lookup user object based on the key provided to serialize user use
 * entire user object is assigned to req.user */
passport.deserializeUser((id, done) => {
  console.log(`deserializeUser ${id}`);
  // Use id to read user object from a database, pass to done
  User.findOne({ where: { id: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log('findOne error in deserialize', err);
    });
});

passport.use(new Strategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,

// Facebook will send back the token and profile
}, (accessToken, refreshToken, profile, done) => {
  // Find the user based on profile.id
  User.findOne({ where: { name: profile.id } })
    .then((user) => {
      console.log(`findOne ${profile.id}`);

      // If user is found, return that user to login
      if (user) {
        console.log(`user ${user}`);
        return done(null, user);
      }

      // If no user found, create newUser
      User.create({
        name: profile.id,
      })

        // Return newUser to login
        .then((newUser) => {
          console.log(`newUser ${newUser}`);
          return done(null, newUser);
        })

        // Catch error
        .catch((errNewUser) => {
          console.log(errNewUser);
          return done(errNewUser);
        });
    })
    .catch((errUser) => {
      return done(errUser);
    });
}));

export default passport;
