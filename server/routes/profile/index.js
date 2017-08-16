// Login ROUTER

var express = require('express');
var passport = require('passport');

// Main Router
var app = express.Router();

// Email Signup Router
var edit_profile = require('./edit/index');

// PROFILE PAGE
app.get('/',function(req,res)
{
	res.render('profile_screen', {user: req.user});
});

// Profile Modification Page
app.use('/edit', edit_profile);

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
