//var mongodb = require('mongodb').MongoClient;
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

publicRouter.route('/carros')
    .get(function(req, res){
        res.render('carros.ejs');
    });


module.exports = publicRouter;