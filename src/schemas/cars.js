var mongoose = require('mongoose');

var carsSchema = mongoose.Schema({
        name:String,
        model:String,
        category:String,
        description:String,
        runners:Number,
        rating:Number,
});



module.exports = mongoose.model('User', carsSchema);