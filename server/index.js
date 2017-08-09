const express = require('express');

//create our first express app
const app = express();

//create a route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

//Dynamically figure out what port to listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
