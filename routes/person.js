var express = require('express');
var router = express.Router();
var db = require('../db');
var paired = require('./paired');
var consts = require('./constants');

/* paired child route */

router.use('/paired', paired);

/* GET users listing. */

// get all people
// todo: pagination
router.get('/', function(req, res, next) {
  db.query(
    'SELECT * FROM person', 
    function(err, rows) {
      if (err) {
        return next(err);
      }

      res.status(consts.SUCCESS).send(rows);
    }
  );
});

// post new person
router.post('/', function(req, res, next) {
  var person = {
    FirstName: req.body.first_name,
    SecondName: req.body.second_name
  };

  db.query(
    'INSERT INTO `person` SET ?',
    person,
    function(err, entry) {
      if (err) {
        next(err);
      }

      person.Id = entry.insertId;
      res.status(consts.SUCCESS).send(person);
    }
  );
});

// delete person
//  - implements a hard-delete (once completed, data is lost)
router.delete('/:personId', function(req, res, next) {
  var id = req.params.personId;

  db.query(
    'DELETE FROM `person` WHERE Id = ?',
    id,
    function(err, result) {
      if (err) {
        next(err);
      }

      res.status(consts.SUCCESS).send({status: 'Success', affectedRows: result.affectedRows});
    }
  );
});

// get specific person
router.get('/:personId', function(req, res, next) {
  console.log(req.params);
  var id = req.params.personId;
  db.query(
    'SELECT * FROM `person` WHERE Id = ?', 
    [id],
    function(err, rows) {
      if (err) {
        return next(err);
      } 

      if (rows.length == 0) {
        res.status(consts.NOT_FOUND).send({message: 'Could not find requested resource'});
      } else {
        res.status(consts.SUCCESS).send({result: rows});
      }  
    }
  );
});

module.exports = router;
