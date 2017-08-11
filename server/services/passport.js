const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//in order to get access to the user model class
const User = mongoose.model('users');

//console.developers.google.com

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have record with the given profile id
          done(null, existingUser);
        } else {
          //we dont have a user record with this id, make a new record
          //this creates a new model instance and then save the instance and then we cretae a second instance
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile:', profile);
      //to create a new instance of the User
    }
  )
);
