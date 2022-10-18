var express = require('express');
var router = express.Router();

const user = require('./user');

router.post('/register', function (request, response) {
    let { email, password, firstName, lastName, phone } = request.body;

    user.register(email, password, firstName, lastName, phone)
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

    user.login(email, password)
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, user: res.user });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/email-verification', function (request, response) {
    let { userId, token } = request.body;

    user.email_verification(userId, token)
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

    user.forgotPassword(email)
        .then((res) => {
            response.status(res.status).json({ message: res.message });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/reset-password/:token', function (request, response) {
    let { password, confirmPassword } = request.body;
    let { token } = request.params;

    user.setForgotPassword(token, password, confirmPassword)
        .then((res) => {
            response.status(res.status).json({ message: res.message });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/deleteAccount', function (request, response) {
    user.deleteAccount(request)
        .then((res) => {
            response.status(res.status).json({ message: res.message });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.post('/authenticate_token', function (request, response) {
    user.authenticate_token(request)
        .then((res) => {
            response
                .status(res.status)
                .json({ message: res.message, user: res.user });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

module.exports = router;
