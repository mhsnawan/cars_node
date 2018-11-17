var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();  
app.set('view-engine', '.ejs');
app.set('views', 'src/views');
var mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

var configDB = require('./src/config/mongodb');

mongoose.connect(configDB, function(err) {
    if (err) throw err;
    console.log('DB connected succesfully');
});

var publicRouter = require('./src/routes/publicroutes');
app.use('/', publicRouter);

var carRouter = require('./src/routes/adminRoutes');
app.use('/', carRouter);



app.listen(port, function(){
    console.log("Listening on port "+ port);
});


