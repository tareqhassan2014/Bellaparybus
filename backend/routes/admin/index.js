var express = require('express');
var router = express.Router();

const admin = require('./admin');

router.post('/register', function (request, response) {
    let { email, password, Name, phone } = request.body;

    admin
        .register(email, password, Name, phone)
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, user: res.user });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/login', function (request, response) {
    let { email, password } = request.body;

    admin
        .login(email, password)
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, user: res.user });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/forgotPassword', function (request, response) {
    let { email } = request.body;

    admin
        .requestForgotPassword(email)
        .then((res) => {
            response.status(res.status).json({ message: res.message });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

module.exports = router;
