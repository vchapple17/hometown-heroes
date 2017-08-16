var mysql = require('./dbcon2.js');

var SocialMedia = {
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
  // READ QUERIES
  // *
  // Return JSON of Object by Id - LIMIT 1
  findById: function (id, callback) {
    var functName = "findById()";
    var queryStr = "SELECT id, service FROM `hh_social_media` WHERE id=? LIMIT 1";

    // console.log(queryStr);
    if (typeof id == "number") {
      var input = [id];
      coach.query(queryStr, input, callback);
    }
    else {
      callback(functName + " Error: 'id' is not a number'");
    }
  },

  findByServiceName: function (service, callback) {
    var functName = "findByServiceName()";
    var queryStr = "SELECT id, service FROM `hh_social_media` WHERE service=? LIMIT 1";

    // console.log(queryStr);
    if (typeof service == "string") {
      var input;
      if (service.toLowerCase() == 'facebook') {
        input = ['Facebook'];
      }
      else if (service.toLowerCase() == 'twitter') {
        input = ['Twitter'];
      }
      else {
        // errorMsg
        callback(functName + " Error: 'service' is not a valid service'");
        return;
      }
      SocialMedia.query(queryStr, input, callback);
    }
    else {
      callback(functName + " Error: 'service' is not a string'");
    }
  }

};
module.exports = SocialMedia;
