var mysql = require('mysql')

// connection details can easily be hidden in a config.js
// which is then not saved into the main available repo if this is required
// interesting library for this: 'dotenv'
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adminpassword',
  database: 'sss'
});

module.exports = connection;