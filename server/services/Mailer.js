const sendgrid = require('sendgrid');
//helper object that creates a mailer
const helper = sendgrid.mail;
const keys = require('../config/keys');

//setup a class
class Mailer extends helper.Mail {}

module.exports = Mailer;
