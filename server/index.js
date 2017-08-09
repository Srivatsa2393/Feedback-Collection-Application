const express = require('express');

//create our first express app
const app = express();

//create a route handler
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(5000);