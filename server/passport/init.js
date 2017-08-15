var facebook = require('./facebook');
var twitter = require('./twitter');
var local = require('./local');
// REFERENCE:
// https://github.com/tutsplus/passport-social/blob/master/passport/init.js

// TEMP Database CALLBACK
var User = require('../db/UserAPI');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
      // console.log('serializing user: ');
      // console.log(user);
      done(null, user);
    });

    passport.deserializeUser(function(id, done) {
      // console.log('deserializing user:',id);
      done(null, id);
    });

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
    twitter(passport);
    local(passport);
}
