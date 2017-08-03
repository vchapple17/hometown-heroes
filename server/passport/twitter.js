var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('../config/auth');

// REFERENCE:
// https://github.com/tutsplus/passport-social/blob/master/passport/twitter.js

// // TEMP DB CALLBACK
var User = require('../db/fakeDBquery');

module.exports = function(passport){
  // From passportjs documentation
  passport.use(new TwitterStrategy({
  	consumerKey: configAuth.twitterAuth.consumerKey,
  	consumerSecret: configAuth.twitterAuth.consumerSecret,
  	callbackURL: configAuth.twitterAuth.callbackURL
  	},
  	function(token, tokenSecret, profile, done) {
      User.findOrCreate({twitterId: profile.id}, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));
}
