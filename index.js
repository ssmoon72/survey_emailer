//require keyword gets access to express library => require is a common js module
//node js doesn't support ES2015 modules, which would normally allow import express from 'express' syntax
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport')

mongoose.connect(keys.mongoURI);


//calling express like a function creates a new express application
//app object sets up configuration that listens to incoming requests from node and routes them to different handlers
const app = express();

//tells express to make use of cookies using cookie-session library
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//requiring the authRoutes file returns a function which is immediately called with the app object
require('./routes/authRoutes')(app);

//heroku injects environment variables. this line is so heroku can dynamically assign a port. if there is no environment variable, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
