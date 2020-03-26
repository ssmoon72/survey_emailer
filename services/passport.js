const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//one argument: fetch out of mongoose, 2 is putting something in.
//User object is model class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
  //user.id is not the google profile id but an id property assigned to the record by mongo
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

//use passport with new instance of Google passport strategy and pass in configuration
//callbackURL is the route the user is sent to after they grant permissions to our application
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
      if(existingUser) {
        //a record already exists with the given profile ID

        //first argument in done function is error object, null says no errors found
         return done(null, existingUser);
        }
        
        //.save function saves record to database
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
  })
);
