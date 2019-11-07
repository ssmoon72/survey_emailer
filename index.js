//require keyword gets access to express library => require is a common js module
//node js doesn't support ES2015 modules, which would normally allow import express from 'express' syntax
const express = require('express');
//calling express like a function creates a new express application
//app object sets up configuration that listens to incoming requests from node and routes them to different handlers
const app = express();

//create new route handler watching for incoming http request
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

//heroku injects environment variables. this line is so heroku can dynamically assign a port. if there is no environment variable, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
