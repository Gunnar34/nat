var express = require('express');
var router = express.Router();
var voteItems = require('../../voteItems')

router.get('/', function(req, res){
  res.send(voteItems);
});

module.exports = router;
