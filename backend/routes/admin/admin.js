require('dotenv').config();

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const transporter = require('../../helpers/mailSender');
const db = require('../../services/db');

const saltRounds = 10;

const userTable = 'admin_info';

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
            `SELECT * FROM ${userTable} WHERE email = '${email}'`
        );

        // user doesn't exist
        if (admin.length === 0) {
            reject({ status: 404, message: 'Cannot find the user!' });
            return;
        }

        if (admin[0].role !== 'admin') {
            reject({ status: 403, message: 'You are not an admin!' });
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
                    message: 'Successfully logged!',
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
            `SELECT * FROM ${userTable} WHERE email_lowercased = '${email_lowercased}'`
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
                `UPDATE ${userTable} SET password_reset_token = '${password_reset_token}', password_reset_token_expired = '${password_reset_expiration}' WHERE email_lowercased = '${email_lowercased}'`
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

/**
 * Sign up Function
 * @param {string} email
 * @param {string} password
 * @param {string} Name
 * @param {string} phone
 */
exports.register = (email, password, Name, phone) => {
    return new Promise(async (resolve, reject) => {
        // check if user already exists
        const user_exist = await db.query(
            `SELECT * FROM ${userTable} WHERE email = '${email}'`
        );

        // user already exists
        if (user_exist.length > 0) {
            reject({
                status: 409,
                message:
                    'This email address is already used. Try a different email address!',
            });
            return;
        }
        // register a new user
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // something went wrong
            if (err) {
                reject({ status: 500, message: 'Internal server error ...' });
                return;
            }

            crypto.randomBytes(32, async function (ex, buf) {
                const rows = await db.query(
                    `INSERT INTO ${userTable} SET email = '${email}', password = '${hash}', name = '${Name}'`
                );

                const user_id = rows.insertId;
                const token = jwt.sign(
                    {
                        data: email,
                    },
                    config.jwtSecret,
                    { expiresIn: '1d' }
                );

                // send email
                await transporter.sendMail({
                    from: config.donotreply_email,
                    to: email,
                    subject: 'Verify your email address',
                    html: `<strong>Please click this link to verify an email. <a>${process.env.DOMAIN_HOST}/signup/verify-email/${user_id}/${email}</a>`,
                });

                resolve({
                    status: 200,
                    message: 'User has been registered!',
                    user: {
                        user_id,
                        email,
                        token,
                    },
                });
            });
        });
    });
};
