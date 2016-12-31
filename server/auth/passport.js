
import passport from 'passport';
import facebookPassport from 'passport-facebook';
import apiKeys from './oauth-keys';
import Users from './user';

const FacebookStrategy = facebookPassport.Strategy;

/* Determine what data from the user object to
 * store in the session, in this case req.session.passport.user */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* Lookup user object based on the key provided to serialize useruse
 * entire user object is assigned to req.user */

passport.deserializeUser((id, done) => {
  Users.findByID(id, (user) => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({

  // Pull facebook API info from oauth-keys.js
  clientID: apiKeys.facebook.clientId,
  clientSecret: apiKeys.facebook.clientSecret,
  callbackURL: apiKeys.facebook.callbackURL,

// Facebook will send back the token and profile
}, (accessToken, refreshToken, profile, done) => {
  // Find the user based on profile.id
  Users.findByID(profile.id, (user) => {
    // If user is found, log them in and return user
    if (user) {
      return done(null, user);
    }
    // If user not found, create that user
    const newUser = {
      id: profile.id,
      token: accessToken,
      name: profile.name,
      email: profile.emails[0].value };

    Users.push(newUser);

    // Log user in and return newUsers
    return done(null, newUser);
  });
}));
