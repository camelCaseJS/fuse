const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
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


const authenicationCallback = (accessToken, refreshToken, profile, done) => {
  // Find the user based on facebook profile.id
  User.findOne({ where: { facebookId: profile.id } })
    .then((user) => {
      // If user is found, pass along user
      if (user) {
        return user;
      }
      // If no user found, create and pass new user
      return User.create({
        facebookId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePictureURL: profile.photos[0].value,
        email: profile.emails[0].value,
      });
    })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
};

// // Token based Authenication for Mobile

passport.use(new FacebookTokenStrategy({
  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],

  }, authenicationCallback));

// Web based Authentication

passport.use(new FacebookStrategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,
  profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],

// Facebook will send back the token and profile
}, authenicationCallback));

module.exports = passport;
