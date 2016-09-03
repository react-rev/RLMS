var express = require('express');
var router = express.Router();
var bparser = require('body-parser');
var DataAccess = require('../tools/mongoDataAccess.js');
router.use(bparser.json());

router.get('/getForum/:batchname',function(req,res){
    var da = new DataAccess;
    console.log(req.params.batchname);
    da.getForums(req.params.batchname,(result)=>{
        res.status(200);
        res.json(result);
        });
});
router.get('/getForum',function(req,res){
    var da = new DataAccess;
    da.getForums(null,(result)=>{
        res.status(200);
        res.json(result);
    });
});
router.post('/postForum', function(req,res){
    var da = new DataAccess();
    da.addOrUpdateForums(req.body,(result)=>{
        res.status(200);
        res.json(result);
    })
});

module.exports = router;