var express = require('express');
var router = express.Router();
var bparser = require('body-parser');
var DataAccess = require('../tools/mongoDataAccess.js');
router.use(bparser.json());


router.get('/getExam',function(req,res){
    var da = new DataAccess();
    da.getExams((result)=>{
        res.status(200);
        res.json(result);
    });
});

router.post('/postExam', function(req,res){
    var da = new DataAccess();
    var Exam=req.body;

    //update grade on databaase
    da.getUsers(Exam.username,(result)=>{
        res.status(200);


        var tmp = result[0].batch;
        tmp.grade=Exam.grade;
        result[0].batch=tmp;
        console.log(result[0]);
        da.addOrUpdateUser(result[0],(done)=>{
            res.json(done);
        });
    });
});


module.exports = router;