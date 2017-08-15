// Login ROUTER

var express = require('express');
var passport = require('passport');

var mysql = require('../../../db/dbcon.js');

// Main Router
var app = express.Router();

// PROFILE EDIT PAGE
app.get('/',function(req,res)
{
	res.render('edit_profile_screen', {user: req.user});
});


/*
// Add user account to database
app.post('/create', function(req, res, next) {
    var data_object = req.body.data;
    var email = data_object['email'];
    var username = data_object['username'];
    var password = data_object['password'];

    mysql.pool.query("INSERT INTO hh_user (`email`, `username`, `password`) VALUES (?,?,?)", [email, username, password], function(err, result) {
        if(err) {
            next(err)
            return;
        }
        res.send(data_object);
    });
});
*/

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
