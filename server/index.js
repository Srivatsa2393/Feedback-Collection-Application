const express = require('express');
//we are not assigning anything so we can just do require
require('./services/passport');

//create our first express app
const app = express();

require('./routes/authRoutes')(app);

//Dynamically figure out what port to listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
