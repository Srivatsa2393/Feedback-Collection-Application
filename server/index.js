const express = require('express');
//requiring mongoose
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
//we are not assigning anything so we can just do require
require('./services/passport');

//instruct mongoose to connect to mongo db
mongoose.connect(keys.mongoURI);

//create our first express app
const app = express();

//express middlewares
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

//the following code should rin only in production
if (process.env.NODE_ENV === 'production') {
  //making sure that express will serve up production assets
  //like our main.js / main.css
  app.use(express.static('client/build'));
  //Express will serve index.html file if it does not recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Dynamically figure out what port to listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
