/**********************************************************
*Gregory Niebanck
*4/20/2017
*CS361 SUMMER 2017
*Description:
*************************************************************/
//setup for express / handlebars / sessions/ mysql
var express = require('express');
var request = require('request');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
//****************************************************





//***********************************************************
// server files and imported library functions
app.use(express.static('public'));
var configAuth = require('./config/auth.js');
//***********************************************************

/*
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

*/

//*******************ROUTES***********************************
app.get('/login',function(req,res) // route for table interactions
{
	res.render('login_screen');
});
app.get('/success',function(req,res) // route for table interactions
{
	res.render('success', fail)
});
app.get('/fail',function(req,res) // route for table interactions
{
	res.render('fail');
});

app.post('/echo', function(req,res,next)
{
	var data_object = req.body.data;
	console.log(data_object);
	res.send(data_object);
});

app.get('/login/FB', passport.authenticate('facebook'));
app.get('/login/FB/callback',
	passport.authenticate('facebook',{
		successRedirect: '/success',
		failureRedirect: '/fail' }));




 //************Generic Error Handling*******************************************
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
    console.log('Express started on port: ' + app.get('port') + '; press Ctrl-C to terminate.');
  });
  //*******************************************************
