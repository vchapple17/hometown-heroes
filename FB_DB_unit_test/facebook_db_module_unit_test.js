var FBDBI = require('./check_FB.js');


var testfunction = function(result)
{
	console.log(result);	
}
/***************************************
Test 1:
Models a user who is in the database with an account previously created
upon success  
*************************************/
var fb_profile1 = {};
fb_profile1.id = 456;
fb_profile1.name = "Hockey Bob";
FBDBI.findOrCreateAccount(fb_profile1, testfunction);

/***************************************
Test 2:
Models a user who has not been added to the DB yet
adds user to both tables
returns newly added insert result
*************************************/

var fb_profile2 = {};
fb_profile2.id = 999;
fb_profile2.name = "Scuba Steve";
FBDBI.findOrCreateAccount(fb_profile2, testfunction);
