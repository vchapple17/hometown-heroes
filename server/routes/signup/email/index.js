// Login ROUTER

var express = require('express');
var passport = require('passport');

// Main Router
var app = express.Router();

// EMAIL LOGIN PAGE
app.get('/',function(req,res)
{
	res.render('email_signup_screen');
});


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
