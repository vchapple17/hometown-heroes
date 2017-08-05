DROP TABLE IF EXISTS `hh_social_media_user`;
DROP TABLE IF EXISTS `hh_social_media`;
DROP TABLE IF EXISTS `hh_user`;

--
-- Table structure for table `hh_user`
--

CREATE TABLE `hh_user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`password` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`lname` varchar(255) NOT NULL,
	`fname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
	`mobile` int(10) NOT NULL,
    `street` varchar(255) NOT NULL,
    `street_2` varchar(255),
	`city` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
    `zip` int(5) NOT NULL,
	`points` int(11) DEFAULT '0',
	`streak_len` int(11) DEFAULT '0',
	`multiplier` int(11) DEFAULT '0',
	`accepted` tinyint(1) NOT NULL DEFAULT '0', 
	PRIMARY KEY (`id`),
  	UNIQUE KEY `username` (`username`)
  ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;


--
-- Table structure for table `hh_social_media`
--

CREATE TABLE `hh_social_media` (
	`id` int(11) NOT NULL,
	`service` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL,
	PRIMARY KEY (`id`),
  	UNIQUE KEY `service` (`service`),
	UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `hh_social_media_user`
--

CREATE TABLE `hh_social_media_user` (
    `uid` int(11) NOT NULL,
	`sid` int(11) NOT NULL,
	`access_token` varchar(255) NOT NULL,
	PRIMARY KEY (`uid`, `sid`),
  	UNIQUE KEY `access_token` (`access_token`),
	CONSTRAINT `hh_social_media_user_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`),
	CONSTRAINT `hh_social_media_user_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `hh_social_media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
