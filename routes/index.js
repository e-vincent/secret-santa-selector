var express = require('express');
var router = express.Router();
// var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('main router');
  // console.log(db);
  // db.query('SELECT * FROM person', function(err, rows){
  //   console.log(err);
  //   console.log(rows);
  //   // res.render('users', {users : rows});
  // });
  // res.render('index', { title: 'Express' });
});



module.exports = router;
