var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var url="mongodb://localhost:27017";
var mongoClient=mongodb.MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-user-name', function(req, res, next) {
  console.log("connecting server...");
  mongoClient.connect(url,function(err,server){
    console.log("server connected...");
    if(err){
        res.send('db connection error');
    }else{
        console.log("connecting database...");
        var db=server.db('nodejs');
        var userCollection=db.collection("user");
        userCollection.find({}).toArray(function(e,s){
               if(e){
                   res.send(e);
               }else{
                console.log("received data from user table...");
                   res.send(s);
               }
        })
    }
})
  //res.send('Hello world');
});

module.exports = router;
