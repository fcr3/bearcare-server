const passport = require('passport');
const Gstrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// generates cookie data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// grabs user with cookie data
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// handles authentication
passport.use(
  new Gstrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    // after authentication approval, this callback is initiated
    // console.log(accessToken);
    const existingUser = await User.findOne({googleId: profile.id})
    if (existingUser) {
        // handle existing user
         return done(null, existingUser);
    }
    const res = await new User({googleId: profile.id}).save();
    done(null, user);
  })
);
