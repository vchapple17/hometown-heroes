Tests facebook database interactions

* Add credentials to dbcon.js *
* data base definition adjustment * 
Changed access_token to an int

DROP TABLE IF EXISTS `hh_social_media_user`;
CREATE TABLE `hh_social_media_user` (
 
	`uid` int(11) NOT NULL,

	`sid` int(11) NOT NULL,

	`access_token` int(32) NOT NULL,

	PRIMARY KEY (`uid`, `sid`),

  	UNIQUE KEY `access_token` (`access_token`),
 
	CONSTRAINT `hh_social_media_user_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`),

	CONSTRAINT `hh_social_media_user_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `hh_social_media` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

* type node 'facebook_db_module_unit_test.js' *

console will output rows in the user table upon success

