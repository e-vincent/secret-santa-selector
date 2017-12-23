var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adminpassword',
  database: 'sss'
});

// console.log(connection);

// connection.query('USE sss');
module.exports = connection;