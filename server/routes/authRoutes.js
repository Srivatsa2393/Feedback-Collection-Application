const passport = require('passport');

module.exports = app => {
  //add a new route handler '/auth/google'
  //here in the second argument we'll tell express to involve passport
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //add a second route handler '/auth/google/callback'
  app.get('/auth/google/callback', passport.authenticate('google'));
};
