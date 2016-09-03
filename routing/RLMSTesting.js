/**
 * Created by coryd on 8/25/2016.
 */
var express =require('express');

var otherApp = express.Router();

//get method
var data = [

    {
        ID:1,
        FirstName:"Cory",
        LastName:"Davenport"
    },
    {
        ID:2,
        FirstName: "Alex",
        LastName:"Redmond"

    },
    {
        ID:3,
        FirstName:"David",
        LastName:"Socha"
    }
]
otherApp.get('/getBasic',function(req,res){
    res.status(200);
    res.send(JSON.stringify(data));
});

module.exports = otherApp;