var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM person', function(err, rows) {
    console.log(err);
    console.log(rows);
    res.status(200).send({users : rows});
  });

  // res.send('respond with a resource');

});

module.exports = router;
