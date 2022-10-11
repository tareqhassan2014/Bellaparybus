var express = require('express');
var router = express.Router();

const vehicles = require('./vehicles');

router.get('/', function(request, response) {

  vehicles.getAll()
    .then(res => {
      response.status(res.status).json({ message: res.message, vehicles: res.vehicles });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/add', function(request, response) {

  const { newVehicle } = request.body;

  vehicles.addOne(newVehicle)
    .then(res => {
      response.status(res.status).json({ message: res.message, vehicles: res.vehicles });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/delete', function(request, response) {

  const { vehicleId } = request.body;

  vehicles.deleteOne(vehicleId)
    .then(res => {
      response.status(res.status).json({ message: res.message, vehicles: res.vehicles });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/update', function(request, response) {

  const { vehicleType, vehicleId } = request.body;

  vehicles.updateOne(vehicleType, vehicleId)
    .then(res => {
      response.status(res.status).json({ message: res.message, vehicles: res.vehicles });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

module.exports = router;
