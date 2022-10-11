const contact = require('./contact');

const router = require('express').Router();

router.post('/create', function (request, response) {
    let { name, email, message, phone } = request.body;

    contact
        .createContact(name, email, message, phone)
        .then((res) => {
            response.status(res.status).json({ message: res.message });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

router.get('/', function (request, response) {
    contact
        .getContacts()
        .then((res) => {
            response.status(res.status).json({ contacts: res.contacts });
        })
        .catch((err) => {
            response.status(err.status).json({ message: err.message });
        });
});

module.exports = router;
