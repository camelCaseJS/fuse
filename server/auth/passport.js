process.env.NODE_ENV = 'development';

const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const apiKeys = require('./oauth-keys');
const User = require('../db/users/User');

const app = express();

/* Determine what data from the user object to
 * store in the session, in this case req.session.passport.user */
passport.serializeUser((user, done) => {
  done(null, user.facebookId);
});

/* Lookup user object based on the key provided to serialize user use
 * entire user object is assigned to req.user */
passport.deserializeUser((facebookId, done) => {
  // Use id to read user object from a database, pass to done
  User.findOne({ where: { facebookId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(new FacebookStrategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,
  profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],

// Facebook will send back the token and profile
}, (accessToken, refreshToken, profile, done) => {
  // Find the user based on profile.id
  console.log(profile);
  User.findOne({ where: { facebookId: profile.id } })
    .then((user) => {

      // If user is found, return that user to login
      if (user) {
        return done(null, user);
      }

      // If no user found, create newUser
      User.create({
        facebookId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePictureURL: profile.photos[0].value,
        email: profile.emails[0].value,
      })

        // Return newUser to login
        .then((newUser) => {
          return done(null, newUser);
        })

        // Catch error
        .catch((errNewUser) => {
          return done(errNewUser);
        });
    })
    .catch((errUser) => {
      return done(errUser);
    });
}));

module.exports = passport;
