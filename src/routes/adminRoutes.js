//var mongodb = require('mongodb').MongoClient;
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
        res.render('admin-categories.ejs');
    });

module.exports = carRouter;