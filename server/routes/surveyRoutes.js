const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    //we want to make sure user is logged in
    //if you are logged in we must make sure that you have enough credits to send a survey
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    //create an attempt to send an email
    //great place to send an email
    //in order to create a instance of class we use the new keyword
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
