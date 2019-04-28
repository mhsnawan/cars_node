var mongodb = require('mongodb').MongoClient;
var url = require('../config/mongodb');
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var publicRouter = express.Router();

publicRouter.route('/')
    .get(function(req, res){
        res.render('index.ejs');
    });

publicRouter.route('/sobrenosotros')
    .get(function(req, res){
        res.render('sobrenosotros.ejs');
    });

publicRouter.route('/detallecarro')
    .get(function(req, res){
        res.render('detallecarro.ejs');
    });

publicRouter.route('/contacto')
    .get(function(req, res){
        res.render('contacto.ejs');
    });

publicRouter.route('/carros/:page')
    .get(function(req, res){
        var perPage = 5;
        var page = req.params.page || 1 ;

        mongodb.connect(url,function(err,db){
            var collection = db.collection('categories');
            collection.find({}).toArray(
                function(err, results){
                    if (err) throw err;
                    mongodb.connect(url,function(err,db){
                        var collection = db.collection('cars');
                        var count = collection.count().then((count) => {
                            pages = Math.ceil(count/perPage);
                            console.log(page);
                        });
                        //Pagination
                        var query = {};
                        
                        // query.size = (perPage * page) - perPage;
                        // query.limit = perPage;
                        
                        query.limit = perPage;
                        query.skip = query.limit * (page - 1);
                        //pagination
                        collection.find({}, query).toArray(
                            function(err, results2){
                                if (err) throw err;
                                res.render('carros.ejs',{
                                    category:results, 
                                    cars:results2, 
                                    current: page, 
                                    pages
                                });
                                db.close();
                              }
                        );
                    });
                    //res.render('carros.ejs',{category:results});
                    db.close();
                  }
            );
        });
    });


module.exports = publicRouter;