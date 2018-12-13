var mongoose = require('mongoose');
var Categories = require('../../src/schemas/categories');
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
}
module.exports.getCategories = function(req,res){
    Categories.find({},function(err,results){
        if(err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res,201,results);
    });
};
module.exports.postCategory = function(req,res){
    cat = new Categories();
    cat.name = req.body.name;
    Categories.create(cat, function(err,results){
        if (err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res, 201, results);
    });
};
module.exports.updateCategory = function(req,res){
    var id = req.params.id;
    Categories.findOneAndUpdate({
        "_id": id
    }, {
        "$set": {
            "name": req.body.name
        }
    }).exec(function (err, result) {
        if (err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res, 201, {message: 'Updated succesfully'});
    });
};
module.exports.deleteCategory = function(req,res){
    id = req.params.id;
    Categories.findByIdAndRemove(id, function (err, post) {
        if (err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res, 201, {message:'Object of id: ' + id +  'Deleted succesfully'});
    });
};