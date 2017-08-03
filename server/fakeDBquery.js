

function User() {
  this.users = [
    {twitterId: 1, facebookId: 1, name: "Tom" }
  ];

  this.findById = function(id, cb) {
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i]
    }
    if (id == this.users[0].twitterId) {
      console.log("MATCH");
      cb(null, self.users[0]);
    }
    else {
      console.log("ERROR");
      cb("ERROR");
    }
  };
  this.findOrCreate = function (user_info, cb) {
    if (user_info.twitterId == this.users[0].twitterId) {
      // found
      console.log("MATCH");
      cb(null, this.users[0]);
    }
    else {
      this.users.push({
        twitterId: user_info.twitterId,
        facebookId: user_info.user_info,
        name: user_info.name
      })
      console.log("Created");
      cb(null, this.users[this.users.length - 1]);
    }
    // else {
    //   console.log("ERROR");
    //   cb("ERROR");
    // }
  }

}

module.exports = new User();
