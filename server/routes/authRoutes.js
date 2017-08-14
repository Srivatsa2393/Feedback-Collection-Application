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
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  //whenever a user makes a request to '/api/logout' he will be logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //third route handler /api/currentUser to get access to the user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
