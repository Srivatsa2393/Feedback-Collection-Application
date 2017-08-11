const express = require('express');
//requiring mongoose
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
//we are not assigning anything so we can just do require
require('./services/passport');

//instruct mongoose to connect to mongo db
mongoose.connect(keys.mongoURI);

//create our first express app
const app = express();

//tell express to make use of cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//tell passport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//Dynamically figure out what port to listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
