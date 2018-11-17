var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();  
app.set('view-engine', '.ejs');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// var configDB = require('./src/config/mongodb');

// mongoose.connect(configDB);

var publicRouter = require('./src/routes/publicroutes');
app.use('/', publicRouter);

app.listen(port, function(){
    console.log("Listening on port "+ port);
});


