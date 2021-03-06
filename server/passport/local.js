var LocalStrategy = require('passport-local').Strategy;
//var configAuth = require('../config/auth');

// REFERENCE:
// https://github.com/passport/express-4.x-local-example

// // TEMP DB CALLBACK
var mysql = require('../db/dbcon.js');

module.exports = function(passport){
    // required for persistent login sessions
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
        mysql.pool.query("SELECT * FROM hh_user WHERE username = ? ",[username], function(err, rows){
            done(err, rows[0]);
        });
    });

  // From passportjs documentation
  passport.use(
    new LocalStrategy({usernameField: 'username', passwordField: 'password', passReqToCallback: true},
  	function(req, username, password, done) {
      mysql.pool.query("SELECT * FROM hh_user WHERE username = ?", [username], function(err, rows){
        if (err) { return done(err); }

        // if username not found
        if (!rows.length) {
          return done(null, false);
        }

        // if the user is found, but wrong password
        if (password != rows[0].password) {
          return done(null, false);
        }
        return done(null, rows[0]);
      });
    }
  ));
}
