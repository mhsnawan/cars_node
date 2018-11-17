var mongodb = require('mongodb').MongoClient;
var url = require('../config/mongodb');
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var carRouter = express.Router();

carRouter.route('/cars')
    .get(function(req, res){
        res.render('admin-cars.ejs');
    });

carRouter.route('/addcar')
    .get(function(req, res){
        res.render('admin-add-car.ejs');
    });

carRouter.route('/detallecarro')
    .get(function(req, res){
        res.render('detallecarro.ejs');
    });

carRouter.route('/contacto')
    .get(function(req, res){
        res.render('contacto.ejs');
    });

carRouter.route('/carros')
    .get(function(req, res){
        res.render('carros.ejs');
    });

///////////////////////////////////////   CATEGORY ROUTES  ////////////////////////////////

carRouter.route('/categories')
    .get(function(req, res){
        mongodb.connect(url,function(err,db){
            var collection = db.collection('categories');
            
            collection.find({}).toArray(
                function(err, results){
                    if (err) throw err;
                    res.render('admin-categories.ejs',{category:results});
                    db.close();
                  }
            );
        });
        // res.render();
    });

carRouter.route('/addcategory')
    .get(function(req, res){
        res.render('admin-add-category.ejs');
    });

carRouter.route('/addcategory')
    .post(function(req, res){
        var data= {
            name: req.body.name,
        };
        mongodb.connect(url, function(err, db){
            if(err)
                console.log('Error in connecting with db');
            else{
            var collection = db.collection('categories');
            collection.insert(data, function(err, results){
                if(err)
                    throw err;
                else
                res.redirect('/categories');
            });
            db.close();
            }
        })
    });

carRouter.route('/editcategory/:id')
    .get(function(req, res){
        var id = new ObjectID(req.params.id);
            
            var query ={
                _id: id
            }
            mongodb.connect(url,function(err,db){
                var collection = db.collection('categories');
                collection.find({_id:id}).toArray(
                    function(err, results){
                        if (err) throw err;
                        res.render('admin-edit-category.ejs',{category:results});
                        db.close();
                      }
                );
            });
       // res.render('admin-edit-category.ejs');
    });

carRouter.route('/editcategory/:id')
    .put(function(req, res){
        var id = new ObjectID(req.params.id);
            
            var query ={
                _id: id
            }
            console.log(query);
            var data = {
                name:req.body.name,
            };
            mongodb.connect(url,function(err,db){
                var collection = db.collection('categories');
                collection.updateOne(query, data, function(err, res) {
                    if (err) throw err;
                    
                    db.close();
                });
            });
    });

carRouter.route('/deletecategory/:id')
    .get(function(req, res){
        var id = new ObjectID(req.body.id);
            mongodb.connect(url,function(err,db){
                var collection = db.collection('categories');
                collection.deleteOne({_id:id},function(err,results){
                    if(err) throw err; 
                    console.log('deleted');
                });
            });
    })
module.exports = carRouter;