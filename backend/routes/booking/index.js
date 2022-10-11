var express = require('express');
var router = express.Router();

const booking = require('./booking');

router.get('/', function (request, response) {
    booking
        .getAll()
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, booking: res.booking });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/bookingRide', function (request, response) {
    booking
        .bookingRide(request)
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, booking: res.booking });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

module.exports = router;
