var express = require('express');

// Main Router
var app = express.Router();

// Routers from files
var auth = require('./auth/index');
// var newSection = require('./folder/index.js') // add as we need

// HOME PAGE
app.route('/')
  .get(function(req, res) {
    res.status(200);
    res.render('home');
  })


// Handles Email, Facebook and Twitter login
app.use('/login', auth);


//************ ECHO POST Information
app.post('/echo', function(req,res,next)
{
	var data_object = req.body.data;
	console.log(data_object);
	res.send(data_object);
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
