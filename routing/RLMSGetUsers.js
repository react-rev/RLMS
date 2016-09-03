var express = require("express");
var router = express.Router();
var mongo = require('../tools/mongoDataAccess.js');
var bParser = require('body-parser');
router.use(bParser.json())
router.get('/getUser/:username', function(req, res){
    res.status(200);
    var da = new mongo();
    da.getUsers(req.params.username, function(result){
        res.json(result);
    })
});
router.post('/updateUserProfile',function(req,res){
    var data = req.body;
    res.status(200);
    var da=new mongo();
    da.addOrUpdateUser(data,function(){
        console.log("alex is      and needs a life " + data);
        (result)=>{
            if(result){
                res.send('fuck yea');
            }
            else{
                res.send('well, shit.....');
            }

        }
    });

})

module.exports = router;


