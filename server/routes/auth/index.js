// Login ROUTER

var express = require('express');
var passport = require('passport');

// Main Router
var app = express.Router();

// EMAIL LOGIN PAGE
app.get('/',function(req,res)
{
	res.render('login_screen');
});

// FACEBOOK LOGIN PAGE & CALLBACK
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback',
	passport.authenticate('facebook',{
		failureRedirect: '/login',
		successRedirect: '/'
  })
);

// TWITTER LOGIN PAGE & CALLBACK
// https://github.com/passport/express-4.x-twitter-example
app.get('/twitter', passport.authenticate('twitter'));
app.get('/twitter/callback',
	passport.authenticate('twitter',{
		failureRedirect: '/login',
		successRedirect: '/'
  })
);

// EMAIL LOGIN CALLBACK
app.post('/',
	passport.authenticate('local',{
		failureRedirect: '/login',
		successRedirect: '/profile',
  })
);


//************Generic Error Handling*******************************************
app.use(function(req, res) {
  res.status(404);
  res.render('404')
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type = ('text/plain');
  res.status(500);
  res.render('500')
})
//*****************************************************************************

module.exports = app;
