const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//in order to get access to the user model class
const User = mongoose.model('users');

//call serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//call deserialize
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//console.developers.google.com

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       //we already have record with the given profile id
    //       done(null, existingUser);
    //     } else {
    //       //we dont have a user record with this id, make a new record
    //       //this creates a new model instance and then save the instance and then we cretae a second instance and we used promises inside the callback
    //       //to create a new instance of the User
    //       new User({ googleId: profile.id })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    //   // console.log('access token', accessToken);
    //   // console.log('refresh token', refreshToken);
    //   // console.log('profile:', profile);
    // }

    //refactoring with async await
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have record with the given profile id
        done(null, existingUser);
      } else {
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
