require('dotenv').config();

const nodemailer = require('nodemailer');

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

module.exports = transporter;
