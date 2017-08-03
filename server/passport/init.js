var facebook = require('./facebook');
var twitter = require('./twitter');
// REFERENCE:
// https://github.com/tutsplus/passport-social/blob/master/passport/init.js

// TEMP Database CALLBACK
var User = require('../db/fakeDBquery');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
      console.log('serializing user: ');
      console.log(user);
      done(null, user);
    });

    passport.deserializeUser(function(id, done) {
      console.log('deserializing user:',id);
      User.findById(id, function(err, user) {
        console.log('deserializing user:',user);
        done(err, user);
      });

    });

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
    twitter(passport);
}
