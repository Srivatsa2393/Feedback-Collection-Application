const express = require('express');
//requiring mongoose
const mongoose = require('mongoose');
const keys = require('./config/keys');
//we are not assigning anything so we can just do require
require('./services/passport');

//instruct mongoose to connect to mongo db
mongoose.connect(keys.mongoURI);

//create our first express app
const app = express();

require('./routes/authRoutes')(app);

//Dynamically figure out what port to listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
