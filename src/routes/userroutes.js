var mongodb = require('mongodb').MongoClient;
var express = require('express');
var url = require('../config/mongodb');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,passport){

        app.get('/myrecipes',isLoggedIn, function(req, res) {
            mongodb.connect(url,function(err,db){
                var collection = db.collection('recipes');
                
                collection.find({'recipeid':req.user.userid}).toArray(
                    function(err, results){
                        if (err) throw err;
                        res.render('myrecipes',{recipe:results});
                        db.close();
                      }
                );
            });
        });
        app.get('/user-recipes',isLoggedIn, function(req, res) {
            mongodb.connect(url,function(err,db){
                var collection = db.collection('recipes');
                
                collection.find({'recipeid':req.user.userid}).toArray(
                    function(err, results){
                        if (err) throw err;
                        res.render('user-recipes',{recipe:results});
                        db.close();
                      }
                );
            });
        });
        app.post('/user-recipe-addrecipe',isLoggedIn,function(req,res){
            var data= {
                name: req.body.name,
                description:req.body.description,
                imagelink:req.body.imagelink,
                recipeid:req.user.userid
            };
            mongodb.connect(url, function(err, db){
                if(err)
                    console.log('Error in connecting with db');
                else{
                var collection = db.collection('recipes');
                collection.insert(data, function(err, results){
                    if(err)
                        throw err;
                    else
                    res.redirect('/user-recipes');
                });
                db.close();
                }
            })
        });
        app.delete('/deleterecipe',isLoggedIn,function(req, res){
            var id = new ObjectID(req.body.id);
            var dbname=req.body.dbname;
            console.log(id + ' ' + dbname);
            mongodb.connect(url,function(err,db){
                var collection = db.collection(dbname);
                collection.deleteOne({_id:id},function(err,results){
                    if(err) throw err;
                    
                });
            });
        });
        app.put('/edit-userrecipe/:id',isLoggedIn,function(req,res){
            
            var id = new ObjectID(req.params.id);
            
            var query ={
                _id: id
            }
            console.log(query);
            var data = {
                name:req.body.name,
                description:req.body.description,
                imagelink:req.body.link,
                recipeid:req.user.userid
            };
            mongodb.connect(url,function(err,db){
                var collection = db.collection('recipes');
                collection.updateOne(query, data, function(err, res) {
                    if (err) throw err;
                    
                    db.close();
                });
            });
        });
};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
            return next();
    }
    else
        res.redirect('/');
}