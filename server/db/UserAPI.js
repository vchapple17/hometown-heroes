
var mysql = require('../db/dbcon2.js');

var SocialMedia = require('./socialMediaAPI');

var User = {
  // *
  // QUERY HELPER
  // *
  query: function(queryStr, input, callback) {
    var functName = "query()";
    // MySQL Query
    mysql.pool.query(queryStr, input, function (error, rows, fields) {
      if (!error) {
        var string = JSON.stringify(rows);
        console.log("Sending: " + string);
        callback(null,rows);
      }
      else {
        console.log(functName + " Error: " + error);
        callback(error);
      }
    });
  },

  // *
  // CREATE QUERIES
  // *

  _createEmptyUser: function ( _null_ , callback) {
    var functName = "_createEmptyUser()";

    // Insert New User, return result
    var queryStr = "INSERT INTO `hh_user` () VALUES ()";
    var input = [];
    User.query(queryStr, input, callback);
  },

  createUserFromSocialMedia: function (user, callback) {
    var functName = "createUserFromSocialMedia()";

    // Check that social media user id does not exist already.
    User.findByAnySocialUserId(user, function (error, result) {
      if (error) {
        callback(functName + " ERROR: Cannot complete findByAnySocialUserId.");
        return;
      }

      // If result is empty, make new User
      if (result.length == 0) {
        if (user.twitterId != 'undefined') {
          // Use twitterId
          User.createUserFromTwitter(user.twitterId, callback);
        }
        else {
          callback(functName + "ERROR: Cannot create User from social media Id.");
          return;
        }
      }
      else {
        callback(functName + "ERROR: User already in database.");
        return;
      }
    });
  },

  createUserFromTwitter: function (id, callback) {
    var functName = "createUserFromTwitter()";

    // PRE: User cannot already exist in social media relationship table
    // Verify that social media user id does not exist already.
    User.findByAnySocialUserId({twitterId: id}, function (error, result) {
      if (error) {
        callback(functName + " Error: Cannot complete findByAnySocialUserId.");
        return;
      }

      // Expect result to be empty, make new User if so
      if (result.length == 0) {
        // Create New Empty User and get ID
        User._createEmptyUser( null, function (error, newUserResponse) {
          if (error) {
            callback(functName + " Error: Cannot create empty user.");
            return;
          }
          // Get Twitter's social media ID to then tie to User
          SocialMedia.findByServiceName('Twitter', function (error, result ) {
            if (error) {
              callback(functName + " Error: Cannot find social media service by name.");
              return;
            }

            // Query for relationship: User and Social Media
            var queryStr = "INSERT INTO hh_social_media_user (uid, sid, user_social_id) VALUES (?,?,?)";

            // Check for 1 Social Media Object returned
            if (result.length == 1) {
              var sid = result[0].id;  // Save service Id from database
              var uid = newUserResponse.insertId;
              var user_social_id = id;
              var input = [uid, sid, user_social_id];

              User.query(queryStr, input, function( err, response) {
                if (error) {
                  callback(functName + " Error: Inserting User and Social Media Relationship.");
                  return;
                }

                // Return User Id



                callback( null, uid);
              });

            }
            else {
              // 0 or 2+ Social Media Objects returned
              callback(functName + " Error: Social media service not found.");
              return;
            }
          });
        });
      }
      else {
        callback(functName + "Twitter User already exists in database.");
        return;
      }
    });
  },



  // *
  // READ QUERIES
  // *

  findByHeroUserId: function (id, callback) {
    var functName = "findByHeroUserId()";
    var queryStr = "SELECT id, email, username, lname, fname, mobile, street, street_2, city, state, zip, points, streak_len, multiplier, accepted FROM `hh_user` WHERE id=? LIMIT 1";

    if (typeof id == "number") {
      var input = [id];
      User.query(queryStr, input, callback);
    }
    else {
      callback(functName + " Error: 'id' is not a number'");
    }
  },

  findOrCreateBySocialUserId: function (user, callback) {
    var functName = "findOrCreateSocialUserId()";

    // Attempt to Find User
    User.findByAnySocialUserId(user, function( error, users ) {
      if (error) {
        callback(functName + " Error");
        return;
      }

      // Check Result for 1 user_info
      if ( users.length == 1) {

        // User found, return user
        User.findByHeroUserId(users[0].uid, function( error, result) {
          if (error) {

            callback(functName + "ERROR: findByHeroUserId." );
            return;
          }

          // Return 1 user
          if (result.length == 1) {
            callback(null, result[0])
          }
          else {
            callback(functName + "ERROR: User created not found." );
          }
        })
      }
      else if ( users.length == 0 ) {
        // No user found by social media
        User.createUserFromSocialMedia(user, function(err, user_id) {
          // check for error
          if (error) {
            callback(functName + "ERROR: in createUserFromSocialMedia " );
            return;
          }

/// FIX
          // Get Newly inserted User for insertId
          if (user_id) {
            User.findByHeroUserId(user_id, function( error, users) {
              if (error) {
                callback(functName + "ERROR: in findByHeroUserId " );
                return;
              }

              // Return 1 user
              if (users.length == 1) {
                callback(null, users[0])
              }
              else {
                callback(functName + "ERROR: User created not found." );
              }
            })
          }
          else {
            callback(functName + "ERROR: User not created." );
          }

        })
      }
      else {
        callback(functName + "ERROR: Duplicate users found." );
      }
    })
  },

  // Return JSON of Coach by Id - LIMIT 1
  findByAnySocialUserId: function (user, callback) {
    var functName = "findByAnySocialUserId()";

    if (user.twitterId != 'undefined') {
      // Check twitterId
      User.findByTwitterUserId(user.twitterId, callback)
    }
  },

  findByTwitterUserId: function ( id, callback)  {
    var functName = "findByAnySocialUserId()";

    // Get Twitter Service ID
    SocialMedia.findByServiceName('Twitter', function (error, result ) {
      if (error) {
        callback(functName + " Error: Cannot find social media service by name.");
        return;
      }

      // Query for relationship: User and Social Media
      var queryStr = "SELECT uid, sid FROM `hh_social_media_user` WHERE user_social_id=? AND sid=? LIMIT 1";

      // Check for 1 Social Media Id returned
      if (result.length == 1) {
        var sid = result[0].id;  // Save service Id from database
        var input = [id, sid];
        User.query(queryStr, input, callback);
      }
      else {
        // 0 or 2+ Objects returned
        callback(functName + " Error: Social media service not found.");
        return;
      }
    });
  }
};
module.exports = User;
