const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    //p is the parse object
    // const p = new Path('/api/surveys/:surveyId/:choice');
    // // console.log(req.body);
    // // res.send({});
    // //processing logic for array of click events
    // const events = _.map(req.body, event => {
    //   //use the url helper
    //   //const pathname = new URL(event.url).pathname;
    //   //console.log(p.test(pathname));
    //   //match will be either object or null
    //   const match = p.test(new URL(event.url).pathname);
    //   if (match) {
    //     return {
    //       email: event.email,
    //       surveyId: match.surveyId,
    //       choice: match.choice
    //     };
    //   }
    // });
    // //console.log(events);
    // const compactEvents = _.compact(events);
    // //removes duplication
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    // console.log(uniqueEvents);

    const p = new Path('/api/surveys/:surveyId/:choice');
    // console.log(req.body);
    // res.send({});
    //processing logic for array of click events
    //const events = _.chain(req.body)
    _.chain(req.body)
      .map(event => {
        //use the url helper
        //const pathname = new URL(event.url).pathname;
        //console.log(p.test(pathname));
        //match will be either object or null
        const match = p.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      //console.log(events);
      .compact()
      //removes duplication
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    //console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    try {
      await mailer.send();
      //save our survey to the database
      await survey.save();
      //deduct 1 credit from user and save the user
      req.user.credits -= 1;
      const user = await req.user.save();
      //send back the updated user model
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
