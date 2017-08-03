// Temporary databse emulator


var User = new Object();

User.users = [
  {id: 1, twitterId: 1, facebookId: 1, name: "Tom" }
];


// FINDS USER BY TWITTER ID OR FACEBOOK ID

User.findById = function(user, cb) {
  // console.log("findById: ", user);
  var foundUser = false;
  if (typeof user.twitterId != 'undefined') {
    // console.log("findById In Twitter loop: ", user.twitterId);
    for (var i = 0; i < User.users.length; i++) {
      // console.log("findById In Twitter loop: ", User.users[i]);
      if (user.twitterId === User.users[i].twitterId) {
        console.log("found Twitter user: ", User.users[i] )
        foundUser = true;
        cb(null, User.users[i]);
      }
    }
    if (!foundUser) {
      console.log("No user found by id");
      cb("ERROR");
    }
  }
  else if (typeof user.facebookId != 'undefined') {
    for (var i = 0; i < User.users.length; i++) {
      if (user.facebookId === User.users[i].facebookId) {
        console.log("found Facebook user: ", User.users[i] )
        var foundUser = true;
        cb(null, User.users[i]);
      }
    }
    if (!foundUser) {
      console.log("No user found by id");
      cb("ERROR");
    }
  }
  else {
    cb("ERROR");
  }

};


// FINDS USER BY TWITTER ID OR FACEBOOK ID OR CREATES NEW USER
User.findOrCreate = function (user_info, cb) {
  console.log("findOrCreate: ", user_info);

  User.findById( user_info, function(err, validuser) {
    console.log("findOrCreate callback");
    if (err === null) {
      console.log("Valid User found");
      cb(null, validuser);
    }
    else {
      // If not found, create
      console.log("User.users: ", User.users);
      User.users.push({
        twitterId: user_info.twitterId,
        facebookId: user_info.facebookId,
        name: user_info.name
      });
      console.log("Created");
      console.log(User.users[User.users.length - 1]);
      cb(null, User.users[User.users.length - 1]);
    }
  });
}

module.exports = User;
