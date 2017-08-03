var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../config/auth');
// REFERENCE:
// https://github.com/tutsplus/passport-social/blob/master/passport/init.js

// // TEMP DB CALLBACK
var User = require('../db/fakeDBquery');

module.exports = function(passport){
  // From passportjs documentation
  passport.use(new FacebookStrategy({
  	clientID: configAuth.facebookAuth.clientID,
  	clientSecret: configAuth.facebookAuth.clientSecret,
  	callbackURL: configAuth.facebookAuth.callbackURL
  	},
  	function(accessToken, refreshToken, profile, done) {
  		User.findOrCreate({ facebookId: profile.id }, function(err, user) {
  			if(err) { return done(err);}
  			done(null, user);
  		});
  	}
  ));
}
