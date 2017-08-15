DROP TABLE IF EXISTS `hh_event_time`;
DROP TABLE IF EXISTS `hh_event_register`;
DROP TABLE IF EXISTS `hh_event_review`;
DROP TABLE IF EXISTS `hh_event_date`;
DROP TABLE IF EXISTS `hh_tag_event`;
DROP TABLE IF EXISTS `hh_tag_user`;
DROP TABLE IF EXISTS `hh_event`;
DROP TABLE IF EXISTS `hh_tag`;
DROP TABLE IF EXISTS `hh_role_user`;
DROP TABLE IF EXISTS `hh_role`;
DROP TABLE IF EXISTS `hh_level_user`;
DROP TABLE IF EXISTS `hh_level`;
DROP TABLE IF EXISTS `hh_social_media_user`;
DROP TABLE IF EXISTS `hh_social_media`;
DROP TABLE IF EXISTS `hh_user`;

--
-- Table structure for table `hh_user`
--

CREATE TABLE `hh_user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255),
	`password` varchar(255),
	`username` varchar(255),
	`lname` varchar(255),
	`fname` varchar(255),
	`mobile` int(10),
	`street` varchar(255),
	`street_2` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`zip` int(5),
	`points` int(11) DEFAULT '0',
	`streak_len` int(11) DEFAULT '0',
	`multiplier` int(11) DEFAULT '0',
	`accepted` tinyint(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`),
  	UNIQUE KEY `username` (`username`)
  ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

INSERT INTO `hh_user` VALUES (1001,'email','password','Hockey_Bob','Hockey','Bob',NULL,'123 Rink Ave','-','Hockey Town','WI',54321,1600,1,1,1),
								(1002,'email','password','user2','Two','User',NULL,'225 Some St','-','Corvalis','OR',97331,0,0,1,1),
								(1003,'email','password','user3','Three','User',NULL,'335 Some St','-','Corvalis','OR',97331,150,2,1,1),
								(1004,'email','password','user4','Four','User',NULL,'445 Some St','-','Corvalis','OR',97331,460,1,1,1),
								(1005,'email','password','user5','Five','User',NULL,'555 Some St','-','Corvalis','OR',97331,710,1,1,1);


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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

INSERT INTO `hh_social_media` VALUES	(81,'Twitter','https://twitter.com/login'),
										(82,'Facebook','https://en-gb.facebook.com/login/');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `hh_social_media_user` VALUES	(1001,81,'access_token1'),
											(1001,82,'access_token2'),
											(1002,81,'access_token3'),
											(1003,82,'access_token4'),
											(1004,81,'access_token5'),
											(1005,81,'access_token6'),
											(1005,82,'access_token7');
--
-- Table structure for table `hh_level`
--

CREATE TABLE `hh_level` (
	`id` int(11) NOT NULL,
	`name` varchar(255),
    `min_points` int(11) NOT NULL,
   	PRIMARY KEY (`id`),
  	UNIQUE KEY `name` (`name`),
  	UNIQUE KEY `min_points` (`min_points`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `hh_level` VALUES (1,NULL,0),(2,NULL,60),(3,NULL,90),(4,NULL,135),(5,NULL,202),(6,NULL,303),(7,NULL,455),(8,NULL,683),(9,NULL,1025),(10,NULL,1537);

--
-- Table structure for table `hh_level_user`
--

CREATE TABLE `hh_level_user` (
	`lid` int(11) NOT NULL,
	`uid` int(11) NOT NULL,
   	PRIMARY KEY (`lid`, `uid`),
	CONSTRAINT `hh_level_user_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `hh_level` (`id`),
	CONSTRAINT `hh_lvel_user_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `hh_level_user` VALUES (10,1001),(1,1002),(4,1003),(7,1004),(8,1005);

--
-- Table structure for table `hh_role`
--

CREATE TABLE `hh_role` (
	`id` int(11) NOT NULL,
	`name` varchar(255),
   	PRIMARY KEY (`id`),
  	UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `hh_role` VALUES (1,'administrator'),(2,'reviewer'),(3,'user');

--
-- Table structure for table `hh_role_user`
--

CREATE TABLE `hh_role_user` (
	`rid` int(11) NOT NULL,
	`uid` int(11) NOT NULL,
   	PRIMARY KEY (`rid`, `uid`),
	CONSTRAINT `hh_role_user_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `hh_role` (`id`),
	CONSTRAINT `hh_role_user_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `hh_role_user` VALUES (1,1001),(3,1002),(3,1003),(2,1004),(2,1005);

--
-- Table structure for table `hh_tag`
--

CREATE TABLE `hh_tag` (
	`id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `hh_tag` VALUES 	(1,'Homelessness'),(2,'Hunger'),(3,'Advocacy'),(4,'Environment'),(5,'Children'),
								(6,'Disabilities'),(7,'Veterans'),(8,'Sports'),(9,'Seniors'),(10,'Handywork');
--
-- Table structure for table `hh_event`
--

CREATE TABLE `hh_event` (
	`id` int(11) NOT NULL,
	`name` varchar(255),
	`oid` int(11) NOT NULL,
	`street` varchar(255) NOT NULL,
    `street_2` varchar(255),
	`city` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
    `zip` int(5) NOT NULL,
    `description` varchar(255),
    `num_volunteers` int(11),
    `num_days` int(11),
    PRIMARY KEY (`id`, `name`),
	CONSTRAINT `hh_event_ibfk_1` FOREIGN KEY (`oid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `hh_event` VALUES	(502,'Tutoring at the Boys and Girls Club',1002,'another address','-','another town','state',54321,'Afterschool tutoring for grades 6-12 in Math and English',5,4),
								(501,'Special Olympics Summer Games',1005,'another address','-','another town','state',54321,'Referees and fans needed for track and field, soccer, softball, and swimming',50,2);

--
-- Table structure for table `hh_event_date`
--

CREATE TABLE `hh_event_date` (
	`id` int(11) NOT NULL,
	`eid` int(11) NOT NULL,
	`date` date,
	`start` time,
    `end` time,
    PRIMARY KEY (`id`, `eid`, `date`),
    CONSTRAINT `hh_event_date_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `hh_event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- INSERT INTO 'hh_event_date' VALUES	(5021,502,'2017-09-18','16:00','18:00'),(5022,502,'2017-09-19','16:00','18:00'),(5023,502,'2017-09-20','16:00','18:00'),(5024,502,'2017-09-21','16:00','18:00'),(5011,501,'2017-06-02','09:00','17:00'),(5011,502,'2018-06-04','09:00','17:00');

--
-- Table structure for table `hh_event_time`
-- Allows for more than one start/end time per day
--

CREATE TABLE `hh_event_time` (
	`did` int(11) NOT NULL,
	`uid` int(11) NOT NULL,
	`start` time NOT NULL,
    `end` time,
    PRIMARY KEY (`did`, `uid`, `start`),
    CONSTRAINT `hh_event_time_ibfk_1` FOREIGN KEY (`did`) REFERENCES `hh_event_date` (`id`),
    CONSTRAINT `hh_event_time_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `hh_event_time` VALUES	(5011,1001,09:00,17:00),(5012,1001,09:00,12:00),(5012,1001,13:00,17:00),(5012,1005,09:00,15:00);

--
-- Table structure for table `hh_event_review`
--

CREATE TABLE `hh_event_review` (
	`eid` int(11) NOT NULL,
	`rid` int(11) NOT NULL,
	`approved` tinyint(1) NOT NULL,
    `comment` varchar(255),
	PRIMARY KEY (`eid`, `rid`),
    CONSTRAINT `hh_event_review_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `hh_event` (`id`),
    CONSTRAINT `hh_event_review_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `hh_event_review` VALUES (501,1001,1,'approved'),(502,1001,1,'approved');

--
-- Table structure for table `hh_event_register`
--

CREATE TABLE `hh_event_register` (
	`did` int(11) NOT NULL,
	`uid` int(11) NOT NULL,
	PRIMARY KEY (`did`, `uid`),
    CONSTRAINT `hh_event_register_ibfk_1` FOREIGN KEY (`did`) REFERENCES `hh_event_date` (`id`),
    CONSTRAINT `hh_event_register_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `hh_event_register` VALUES (5011,1001),(5012,1001),(5012,1005),(5021,1002),(5022,1003),(5023,1004),(5024,1005);

--
-- Table structure for table `hh_tag_user`
--

-- CREATE TABLE `hh_tag_user` (
--	`uid` int(11) NOT NULL,
--	`tid` int(11) NOT NULL,
--	PRIMARY KEY (`uid`, `tid`),
--    CONSTRAINT `hh_tag_user_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`),
--    CONSTRAINT `hh_tag_user_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `hh_tag` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `hh_tag_user` VALUES	(1001,10),(1001,9),(1001,6),(1001,1),(1001,11),(1001,4);
									-- (1002,2),(1002,1),(1002,4),(1002,5),(1002,7),(1002,11),
									-- (1003,11),(1003,10),(1003,9),(1003,8),(1003,7),(1003,6),
									-- (1004,11),(1004,5),(1004,4),(1004,3),(1004,2),(1004,1),
									-- (1005,11),(1005,9),(1005,8),(1005,7),(1005,6),(1005,5);

--
-- Table structure for table `hh_tag_event`
--

-- CREATE TABLE `hh_tag_event` (
--	`eid` int(11) NOT NULL,
--	`tid` int(11) NOT NULL,
--	PRIMARY KEY (`eid`, `tid`),
--	CONSTRAINT `hh_tag_event_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `hh_event` (`id`),
--	CONSTRAINT `hh_tag_event_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `hh_tag` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `hh_tag_event` (501,5),(501,6),(501,8),(502,5),(502,11);
