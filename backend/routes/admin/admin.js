require('dotenv').config();

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const transporter = require('../../helpers/mailSender');
const db = require('../../services/db');

const saltRounds = 10;

const adminTable = 'admin';

/**
 * Log in Function
 * @param {string} email
 * @param {string} password
 */
exports.login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        const email_lowercased = email.toLowerCase();
        // check if user already exists
        const admin = await db.query(
            `SELECT * FROM ${adminTable} WHERE email_lowercased = '${email_lowercased}'`
        );

        // user doesn't exist
        if (admin.length === 0) {
            reject({ status: 404, message: 'Cannot find the user!' });
            return;
        }

        // User exists
        const adminPassword = admin[0].password;

        //Compare the password
        bcrypt.compare(password, adminPassword).then(function (result) {
            if (result) {
                const token = jwt.sign(
                    {
                        data: email,
                    },
                    config.jwtSecret,
                    { expiresIn: '1d' }
                );
                resolve({
                    status: 200,
                    message: 'Successfully loggedin!',
                    user: {
                        id: admin.id,
                        email: email,
                        token,
                    },
                });
            } else {
                // incorrect password
                reject({ status: 401, message: 'Sorry wrong password!' });
            }
        });
    });
};

/**
 * Request Forgot Password Function
 * @param {string} email
 */
exports.requestForgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        const email_lowercased = email.toLowerCase();
        const admin = await db.query(
            `SELECT * FROM ${adminTable} WHERE email_lowercased = '${email_lowercased}'`
        );

        // user doesn't exist
        if (admin.length === 0) {
            reject({ status: 404, message: "That email doesn't exist ..." });
            return;
        }

        const id = admin[0]['id'];

        crypto.randomBytes(32, async function (ex, buf) {
            var password_reset_token = buf.toString('hex');
            var token_expired = Date.now() + config.password_reset_expiration;
            var password_reset_expiration = new Date(token_expired)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            const rows = await db.query(
                `UPDATE ${adminTable} SET password_reset_token = '${password_reset_token}', password_reset_token_expired = '${password_reset_expiration}' WHERE email_lowercased = '${email_lowercased}'`
            );

            // send email
            await transporter.sendMail({
                from: config.donotreply_email,
                to: email,
                subject: 'Reset the password',
                html: `<strong>Please click this link to verify an email. <a>${process.env.DOMAIN_HOST}/admin/verify-email/${id}/${password_reset_token}</a>`,
            });

            resolve({
                status: 200,
                message: 'Password reset!',
            });
        });
    });
};
