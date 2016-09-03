var express = require('express');
var router = express.Router();
var bparser = require('body-parser');
var DataAccess = require('../tools/mongoDataAccess.js');
router.use(bparser.json());

router.get('/getLesson',function(req,res){
    var da = new DataAccess;
    da.getLessons(null,(result)=>{
        res.status(200);
        res.json(result);
    });
});

router.get('/getLesson/:batchName',function(req,res){
    var da = new DataAccess;
    da.getLessons(req.params.batchName,(result)=>{
        res.status(200);
        res.json(result);
    });
});


module.exports = router;