var MongoClient = require('mongodb').MongoClient;
var exports = module.exports = {};
url = 'mongodb://localhost:27017/test';
exports.establish = (callback)=>{
  MongoClient.connect(url,(err,db)=>{
    callback(db);
  })
}
