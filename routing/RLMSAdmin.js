var express = require('express');
var router = express.Router();
var bparser = require('body-parser');
var DataAccess = require('../tools/mongoDataAccess.js');
router.use(bparser.json());

router.get('/getAllUsers', function(req,res){
    var da = new DataAccess;
    da.getUsers(null,(result)=>{
        res.status(200);
        res.json(result);
    });
});

router.post('/updateBatchAndUsers', function(req,res) {
  var batchToPost = req.body;
  var da = new DataAccess;
  res.status(201);

  batchToPost.forEach(function(item) {
    da.addOrUpdateUser(item, (result) => {
    });
  });

  res.send('done');

});

// router.post('/createNewBatch', function(req,res) {
//   var newBatch = req.body;
//   var da = new DataAccess;
//   da.addOrUpdateUser(req.body, (result) => {
//     res.status(201);
//   });
// });

module.exports = router;
