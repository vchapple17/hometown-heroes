/**********************************************************
*Gregory Niebanck
*Valerie Chapple
*7/31/2017
*Updated: Aug 3, 2018
*CS361 SUMMER 2017
*Description:
*************************************************************/
//setup for express / handlebars / sessions/ mysql
var express = require('express');
var request = require('request');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var session = require('express-session');	// Needed for Passport-Twitter OAuth1
var cookieParser = require('cookie-parser'); // Required for sessions?

var initPassport = require('./passport/init');

var app = express();

// bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 16661);//<---------------Adjust port here


//************* database access ********************
var mysql = require('mysql');
/*
var pool = mysql.createPool({
  connectionLimit: 30,
  host 		 : '',
  user 		 : '',
  password       : '',
  database       : ''
});*/


// // TEMP DB CALLBACK
// var User = require('./fakeDBquery');

//***********************************************************


//***********************************************************
// server files and imported library functions
app.use(express.static('public'));
// var configAuth = require('./config/auth.js');

// Hometown Heroes ROUTES
var router = require('./routes/index');


// //***********************************************************
// // Configure Passport Strategies
// // From passportjs documentation
// passport.use(new FacebookStrategy({
// 	clientID: configAuth.facebookAuth.clientID,
// 	clientSecret: configAuth.facebookAuth.clientSecret,
// 	callbackURL: configAuth.facebookAuth.callbackURL
// 	},
// 	function(accessToken, refreshToken, profile, done) {
// 		User.findOrCreate({ facebookId: profile.id }, function(err, user) {
// 			if(err) { return done(err);}
// 			done(null, user);
// 		});
// 	}
// ));
//
// passport.use(new TwitterStrategy({
// 	consumerKey: configAuth.twitterAuth.consumerKey,
// 	consumerSecret: configAuth.twitterAuth.consumerSecret,
// 	callbackURL: configAuth.twitterAuth.callbackURL
// 	},
// 	function(token, tokenSecret, profile, done) {
//     User.findOrCreate({twitterId: profile.id}, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
// 		// done(null, {user: "fakeName"});
//   }
// ));
//
// // PASSPORT SESSION SETUP (passportjs docs)
// // NOTE: Code below can be linked to database query to get User
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(id, done) {
//   // User.findById(id, function(err, user) {
//   //   done(err, user);
//   // });
//   done(null, id);
// });
//

app.use(cookieParser());
app.use(session({
  secret: 'HH-secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Initialize passport
initPassport(passport);

//***********************************************************

// Router
app.use('/', router);

 //************Generic Error Handling************************
  app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
  });
    app.listen(app.get('port'), function(){
    console.log('Express started on port: ' + app.get('port') +
		'; press Ctrl-C to terminate.');
  });
  //***********************************************************
