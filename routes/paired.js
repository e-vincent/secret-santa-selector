var express = require('express');
var router = express.Router();
var db = require('../db');
var consts = require('./constants');

// ideas for large lists:
// - /paired/new
// -- generates new list, via SQL - save to table
// - /paired
// -- pulls all pairings
// -- enables pagination

// get pairs
//  - new random list on each call
//  - will not give a person themselves
// improvement: save recent pairing
// - enable route /paired/:personId
// - returns last given pairing for the given personId
// - involves saving generated list as a table
router.get('/', function(req, res, next) {
  // need all current people
  db.query(
    'SELECT * FROM `person`',
    function(err, rows) {
      if (err) {
        next(err);
      }

      if (rows.length == 0) {
        res.status(consts.NOT_FOUND).send({message: 'No names to pair. Please add more and try again.'});
      }

      if (rows.length == 1) {
        res.status(consts.BAD_DATA).send({message: 'Insufficient number of people present. Please add more and try again.'});
      }

      var pairs = {}
      do { // run at least once
        pairs = getPairs(rows);
      }
      while (pairs.status == 'repick');

      res.status(consts.SUCCESS).send(pairs.output);
    }
  );
});

/* assumed form of object:
 * { FirstName: ..., SecondName: ..., ... }
 */
getName = function(obj) {
  return obj.FirstName + ' ' + obj.SecondName;
}

/* calculate pairs
 * returns {
 *   status: 'success' / 'repick',
 *   output: { ... } 
 * }
 */
getPairs = function(rows) {
  var res = {
    // assume success until failure
    status: 'success'
  };
  var potential_pair = rows.map(function(elem) {
    return elem.Id;
  });
  var output = [];

  for (var r in rows) {
    var elem = rows[r];
    // random index within the length of the list
    var length = potential_pair.length;
    var index = Math.floor(Math.random() * length);

    // check we didn't random the selected elem's Id
    if (potential_pair[index] == elem.Id) {
      // decide whether to inc up or down
      index = (index == (length - 1) ? --index : ++index);
      // if index breaks boundary, repick
      if (index < 0) {
        res.status = 'repick';
        break;
      }
    }

    // at this point potential_pair[index] gives us an Id different to elem.Id
    // pull out the match object and remove the index from the potentials
    var match = rows.find(function(soul) {
      return soul.Id == potential_pair[index];
    });
    potential_pair.splice(index, 1);

    // santa sends gifts to good souls
    var santa     = getName(elem);
    var good_soul = getName(match)
    output.push({giver: santa, receiver: good_soul});
  }

  res.output = output;
  return res;
}

// repick improvements
// - repick subset?
// -- doesn't have huge impact of overall randomness
// - implement map/reduce
// -- randomize potential picks
// -- split down into 2/3 size arrays
// -- base case: make these people buy for each other
// -- downside: for a real game, no potential of big present chains

module.exports = router;
