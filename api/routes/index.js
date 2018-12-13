var express = require('express');
var apiRouter = express.Router();
var ctrlCars = require('../controller/cars');
var ctrlCategories = require('../controller/categories');

/* Locations pages */
apiRouter.get('/get-cars',ctrlCars.getCars);
apiRouter.post('/post-car',ctrlCars.postCars);
apiRouter.put('/updatecar/:id',ctrlCars.updateCar);
apiRouter.delete('/deletecar/:id',ctrlCars.deleteCar);

//Other pages
apiRouter.get('/get-categories',ctrlCategories.getCategories);
apiRouter.post('/post-category',ctrlCategories.postCategory);
apiRouter.put('/update-category/:id',ctrlCategories.updateCategory);
apiRouter.delete('/delete-category/:id',ctrlCategories.deleteCategory);
module.exports = apiRouter;