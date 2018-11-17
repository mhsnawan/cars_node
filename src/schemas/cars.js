var mongoose = require('mongoose');

var carsSchema = mongoose.Schema({
        make:String,
        model:String,
        category:String,
        description:String,
        color:String,
        runners:Number,
        rating:Number,
});



module.exports = mongoose.model('User', carsSchema);