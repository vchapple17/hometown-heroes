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
    `email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`lname` varchar(255) NOT NULL,
	`fname` varchar(255) NOT NULL,
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
  ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

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

--
-- Table structure for table `hh_role`
-- 

CREATE TABLE `hh_role` (
	`id` int(11) NOT NULL,
	`name` varchar(255),
   	PRIMARY KEY (`id`),
  	UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

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

-- 
-- Table structure for table `hh_tag`
-- 

CREATE TABLE `hh_tag` (
	`id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

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

--
-- Table structure for table `hh_event_date`
-- 

CREATE TABLE `hh_event_date` (
	`id` int(11) NOT NULL,
	`eid` int(11) NOT NULL,
	`date` datetime,
	`start` time,
    `end` time,
    PRIMARY KEY (`id`, `eid`, `date`),
    CONSTRAINT `hh_event_date_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `hh_event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

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

-- 
-- Table structure for table `hh_tag_user`
-- 

CREATE TABLE `hh_tag_user` (
	`uid` int(11) NOT NULL,
	`tid` int(11) NOT NULL,
	PRIMARY KEY (`uid`, `tid`),
    CONSTRAINT `hh_tag_user_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `hh_user` (`id`),
    CONSTRAINT `hh_tag_user_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `hh_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Table structure for table `hh_tag_event`
-- 

CREATE TABLE `hh_tag_event` (
	`eid` int(11) NOT NULL,
	`tid` int(11) NOT NULL,
	PRIMARY KEY (`eid`, `tid`),
	CONSTRAINT `hh_tag_event_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `hh_event` (`id`),
	CONSTRAINT `hh_tag_event_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `hh_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
