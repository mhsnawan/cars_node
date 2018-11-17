var mongodb = require('mongodb').MongoClient;
var url = require('../config/mongodb');
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var carRouter = express.Router();

//////////////////////////////////////////// CAR ROUTES ////////////////////////////////////////
carRouter.route('/cars')
    .get(function(req, res){
        mongodb.connect(url,function(err,db){
            var collection = db.collection('cars');
            
            collection.find({}).toArray(
                function(err, results){
                    if (err) throw err;
                    res.render('admin-cars.ejs',{cars:results});
                    db.close();
                  }
            );
        });
    });

carRouter.route('/addcar')
    .get(function(req, res){
        mongodb.connect(url,function(err,db){
            var collection = db.collection('categories');
            collection.find({}).toArray(
                function(err, results){
                    if (err) throw err;
                    res.render('admin-add-car.ejs',{category:results});
                    db.close();
                  }
            );
        });
    });

carRouter.route('/addcar')
    .post(function(req, res){
        var data= {
            make: req.body.make,
            model: req.body.model,
            category: req.body.category,
            color: req.body.color,
            description: req.body.description,
            runner: 5,
            rating: 5
        };
        mongodb.connect(url, function(err, db){
            if(err)
                console.log('Error in connecting with db');
            else{
            var collection = db.collection('cars');
            collection.insert(data, function(err, results){
                if(err)
                    throw err;
                else
                res.redirect('/cars');
            });
            db.close();
            }
        })
    });

carRouter.route('/editcar/:id')
    .get(function(req, res){
        var id = new ObjectID(req.params.id);
            
            var query ={
                _id: id
            }
            mongodb.connect(url,function(err,db){
                var collection = db.collection('cars');
                collection.find({_id:id}).toArray(
                    function(err, results){
                        if (err) throw err;
                        mongodb.connect(url,function(err,db){
                            var collection = db.collection('categories');
                            
                            collection.find({}).toArray(
                                function(err, results2){
                                    if (err) throw err;
                                    res.render('admin-edit-car.ejs',{cars:results, category: results2});
                                    db.close();
                                  }
                            );
                        });
                        
                        db.close();
                      }
                );
            });
       // res.render('admin-edit-category.ejs');
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
    });








module.exports = carRouter;