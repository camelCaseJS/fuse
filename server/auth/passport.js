
import passport from 'passport';
// Strategy applies to facebook, if other strategies are used need refactor
import { Strategy } from 'passport-facebook';
import apiKeys from './oauth-keys';

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
  // TODO: use id to read user object from a database, pass to done
  done(null, id);
});

passport.use(new Strategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,

// Facebook will send back the token and profile
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  // Find the user based on profile.id
    // If user is found
      // Log them in and return user
    // If user not found
      // Create that user
      // Log user in and return newUsers
  return done(null, profile);
}));

export default passport;
