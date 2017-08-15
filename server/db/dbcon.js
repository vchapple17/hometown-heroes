var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 30,
  host            : '',
  user            : '',
  password        : '',
  database        : '',
});
