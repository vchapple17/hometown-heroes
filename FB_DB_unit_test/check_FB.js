var Facebook_DB_module = new Object();
var mysql = require('./dbcon.js');

function social_media_table_query(facebook_profile,findUser,CreateUser,callback)
{
	var facebook_id = facebook_profile.id;
	var facebook_sid = 82;
	var qstring ="SELECT * FROM hh_social_media_user WHERE sid =" + facebook_sid + " AND access_token=" + facebook_id;
	mysql.pool.query(qstring,
		function(err,rows,fields)
		{
			if(err)
			{
				callback("sql error 1");
			}
			else if(rows[0])
			{
				var hh_id = rows[0].uid;
				findUser(hh_id,callback);
			}
			else
			{
				//console.log("first time facebook user");
				createHHUser(facebook_profile, callback);
			}
			
		}
	);
}
function findHHUser(user_id, callback)
{
	var qstring ="SELECT * FROM hh_user WHERE id =" + user_id;
	mysql.pool.query(qstring,
		function(err, rows, fields)
		{
			if(err)
			{
				callback("sql error 2");
			}
			else{callback(rows);}
		}
	);
}
function createHHUser(facebook_profile, callback)
{
	var username = facebook_profile.name;
	var facebook_id = facebook_profile.id;
	//console.log("creating HH user");
	mysql.pool.query("INSERT INTO hh_user (`username`) VALUES(?)",
	[username], function(err,result)
	{
		if(err)
		{
			console.log(username);
			callback("sql error 3");
		}
		else
		{
			var uid = result.insertId;
			mysql.pool.query("INSERT INTO hh_social_media_user (`uid`,`sid`,`access_token`) VALUES(?,?,?)",
			[uid,82,facebook_id], function(err,result)
			{
				if(err)
				{
					console.log("ERROR IN SQL QUERY hh_social_media_user INSERTION");
					callback("sql error 4");
				}
				else
				{
					callback(result);
				}
			});
		}
	});
}
function findOrCreateAccount(facebook_profile, callback)
{
	
	social_media_table_query(facebook_profile,findHHUser,createHHUser,callback);
	
}


Facebook_DB_module.findOrCreateAccount = findOrCreateAccount; 
module.exports = Facebook_DB_module;
