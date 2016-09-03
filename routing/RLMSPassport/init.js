var express = require('express');
var app = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var cookie = require('cookie-parser');

var session = require('express-session');
var mon = require('../../tools/mongoDataAccess.js');

var user = [
  {
      "ID": 0,
      "username": "dev",
      "password": "123",
      "admin": 1
    },
    {
      "ID": 1,
      "username": "guy",
      "password": "123",
      "admin": 0
    },
    {
      "ID": 2,
      "username": "gal",
      "password": "123",
      "admin": 0
    }
];

app.get('/testGet', function(req, res){
   res.json(data.getData());
});

app.use(cookie('itsASecretToEveyone'));
app.use(session({
  secret:'itsASecretToEveyone', 
  saveUninitialized: true,
  resave: false,
  cookie: {path: '/user', httpOnly: true, maxAge: 5000}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(userData, cb){
  var sessionUser = {_id: userData.ID, name: userData.username}
  cb(null, sessionUser);
});

passport.deserializeUser(function(sessionUser, cb){
  findUserByID(sessionUser.ID, cb);
});

function findUser(name, callback){
  
  var da = new mon();
  da.getUsers(name, function(result){
    if(result.length > 0){
      
    //   var item = {
    //     ID: result[0].id,
    //     firstname: result[0].f_name,
    //     lastname: result[0].l_name,
    //     batch: result[0].batch
    //   };
                     
    //  localStorage.setItem('userObj', item);
     return callback(null, result[0]); 
    } else{
      return callback(null, false);
    }
  });
}

function findUserByID(id, callback){
  
  var da = new mon();
  da.getUsers(null, function(userList){
      for(var i = 0; i < userList.length; i++){
    if(userList[i].ID == id){
      return callback(null, userList[i]);
    }
  }
  return callback(null, false);
  });
}

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  findUser(username, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false);
    }
    if(password !== user.password){
      return done(null,  false);
    }
    
    return done(null, user);
  });
}));

module.exports = app;