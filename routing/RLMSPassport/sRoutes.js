var express = require('express');
var passport = require('passport');
var app = express.Router();
var parser = require('body-parser');
var mon = require('../../tools/mongoDataAccess.js');

var secure = require('./init.js');

app.use('/', secure);
app.use(parser.urlencoded({extended:false}));


app.get('/profile/:username', function(req, res){
    var url = '/#/home/forum?id='+req.params.username;
    res.redirect(url);
});

app.post('/login', passport.authenticate('local', {
  //successRedirect: '/api/profile/',
  failureRedirect: '/#/login'
}), function(req, res){
  if(req.body.username){
    res.redirect('/api/profile/'+req.body.username);
  }
});

app.post('/signup', function(req, res){
  if(req.body.cPass === req.body.password){
    var da = new mon();
    var userData = {
      username: req.body.username,
      f_name: req.body.firstname,
      l_name: req.body.lastname,
      password: req.body.password,
      email: req.body.email
    };
    da.getUsers(userData.username, function(result){
      if(result.length == 0){

        da.addOrUpdateUser(userData, function(result){
          if(result == "success"){

            da.getUsers(userData.username, function (result) {
              // var item = {
              //   ID: result[0]._id,
              //   firstname: result[0].f_name,
              //   lastname: result[0].l_name,
              //   batch: result[0].batch};

              // localStorage.setItem('userObj', it em);
              res.redirect('/api/profile/'+result[0].username);            

            });

          }});

      }});
  }});

module.exports = app;
