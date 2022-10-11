var express = require('express');
var router = express.Router();

const user = require('./user');
const admin = require('./admin');
const vehicles = require('./vehicles');
const booking = require('./booking');
const occasions = require('./occasions');
const contact = require('./contact');

router.use('/user', user);
router.use('/admin', admin);
router.use('/vehicles', vehicles);
router.use('/occasions', occasions);
router.use('/booking', booking);
router.use('/contact', contact);

module.exports = router;
