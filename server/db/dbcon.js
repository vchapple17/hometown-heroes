var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 30,
  host            : 'localhost',
  user            : 'valchapple',
  password        : 'hometown',
  database        : 'hh_db',
});
