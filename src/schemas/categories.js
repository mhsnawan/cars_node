var mongoose = require('mongoose');

var CategoriesSchema = mongoose.Schema({
        name:String
});
module.exports = mongoose.model('Categories', CategoriesSchema);