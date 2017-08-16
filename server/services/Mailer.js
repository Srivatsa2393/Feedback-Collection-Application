const sendgrid = require('sendgrid');
//helper object that creates a mailer
const helper = sendgrid.mail;
const keys = require('../config/keys');

//setup a class
//content is the html string obtained from surveyTemplate(survey) and the initial destructuring is the survey object
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    //sendgrid stuff
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;
