var express = require('express');
var router = express.Router();

const occasions = require('./occasions');

router.get('/', function(request, response) {

  occasions.getAll()
    .then(res => {
      response.status(res.status).json({ message: res.message, occasions: res.occasions });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/add', function(request, response) {

  const { newOccasion } = request.body;

  occasions.addOne(newOccasion)
    .then(res => {
      response.status(res.status).json({ message: res.message, occasions: res.occasions });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/delete', function(request, response) {

  const { occasionId } = request.body;

  occasions.deleteOne(occasionId)
    .then(res => {
      response.status(res.status).json({ message: res.message, occasions: res.occasions });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

router.post('/update', function(request, response) {

  const { occasionName, occasionId } = request.body;

  occasions.updateOne(occasionName, occasionId)
    .then(res => {
      response.status(res.status).json({ message: res.message, occasions: res.occasions });
    })
    .catch(err => {
      response.status(err.status).json({ message: err.message });
    });
})

module.exports = router;
