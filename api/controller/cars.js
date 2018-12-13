// router.get('/get-cars',ctrlCars.getCars);
// router.post('/post-car',ctrlCars.postCars);
// router.put('/updatecar/:carid',ctrlCars.addReview);
// router.delete('/deletecar/:carid',ctrlCars.doAddReview);
var mongoose = require('mongoose');
var Cars = require('../../src/schemas/cars');
var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
}
module.exports.getCars = function(req,res){
    Cars.find({},function(err,results){
        if(err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res,201,results);
    });
};
module.exports.postCars = function(req,res){
    cars = new Cars();
    cars.make = req.body.make;
    cars.model = req.body.model;
    cars.category = req.body.category;
    cars.description = req.body.description;
    cars.color = req.body.color;
    cars.runners = req.body.runners;
    cars.rating = req.body.rating;
    Cars.create(cars, function(err,results){
        if (err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res, 201, results);
    });
};
module.exports.updateCar = function(req,res){
    var id = req.params.id;
        Cars.findOneAndUpdate({
            "_id": id
        }, {
            "$set": {
                "make": req.body.make,
                "model": req.body.model,
                "category": req.body.category,
                "description": req.body.description,
                "color": req.body.color,
                "runners": req.body.runners,
                "rating": req.body.rating,
            }
        }).exec(function (err, result) {
            if (err)
                sendJsonResponse(res, 400, err);
                sendJsonResponse(res, 201, {'message': 'Updated succesfully'});
        });
};
module.exports.deleteCar = function(req,res){
    id = req.params.id;

    Cars.findByIdAndRemove(id, function (err, post) {
        if (err)
            sendJsonResponse(res, 400, err);
        sendJsonResponse(res, 201, {message:'Object of id: ' + id +  'Deleted succesfully'});
    });
};