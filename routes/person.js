var express = require('express');
var router = express.Router();
var db = require('../db');

const SUCCESS = 200;
const FAILURE = 404;
const ERROR   = 500;

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

      res.status(SUCCESS).send(rows);
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
        res.status(FAILURE).send({message: 'Could not find requested resource'});
      } else {
        res.status(SUCCESS).send({result: rows});
      }  
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
      res.status(SUCCESS).send(person);
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

      res.status(SUCCESS).send({status: 'success', affectedRows: result.affectedRows});
    }
  );
});

// get pairs
//  - new random list on each call
//  - will not give a person themselves
// improvement: save recent pairing
// - enable route /paired/:personId
// - returns last given pairing for the given personId
router.get('/paired', function(req, res, next) {
  res.send('NOT YET IMPLEMENTED');
});

module.exports = router;
