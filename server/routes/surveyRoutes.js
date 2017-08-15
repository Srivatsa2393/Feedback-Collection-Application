const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/surveys', requireLogin, (req, res) => {
    //we want to make sure user is logged in
    //if you are logged in we must make sure that you have enough credits to send a survey
  });
};
