

var User = new Object();
var mysql = require('../db/dbcon.js');

function actualDBCall(qstring)
{
    mysql.pool.query(qstring,function(err,rows,fields)
		{
			if(err)
			{
				next(err);
				console.log("Query Error");
				return;
 	    }
      if(rows)
      {
        mysql.pool.query("SELECT * FROM hh_user WHERE id =" + rows[0].uid,function(err,rows2,fields)
    		{
          if(err)
    			{
    				next(err);
    				console.log("Query Error");
    				return;
     	    }
          return rows2[0];
        });
      };
      else{return NULL};
		});
}

// FINDS USER BY TWITTER ID OR FACEBOOK ID OR CREATES NEW USER

User.findOrCreate = function (user_info, cb)
{
    var foundUser = false;
    if (typeof user.twitterId != 'undefined')
    {
      var qstring = "SELECT * FROM hh_social_media_user WHERE sid=81 AND access_token =" + user_info;
      var validUser = actualDBCall(qstring);
      if(validUser)
      {
        foundUser = true;
        cb(NULL, validUser);
      }
    }
    else if (typeof user.facebookId != 'undefined')
    {
      var qstring = "SELECT * FROM hh_social_media_user WHERE sid=82 AND access_token =" + user_info;
      var validUser = actualDBCall(qstring);
      {
        foundUser = true;
        cb(NULL, validUser);
      }
    }
    if (!foundUser)
    {
      // Direct user to create a name page
      // Or we could make their user name their name from the twitter or fb profile info and do an insert DB call
    }

};
module.exports = User;
