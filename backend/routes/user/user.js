require('dotenv').config();

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const transporter = require('../../helpers/mailSender');
const db = require('../../services/db');
const checkToken = require('../../helpers/checkToken');

const saltRounds = 10;

const userTable = 'user_info';

function makeid(length) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

/**
 * Sign up Function
 * @param {string} email
 * @param {string} password
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phone
 */
exports.register = (email, password, firstName, lastName, phone) => {
    return new Promise(async (resolve, reject) => {
        const email_lowercased = email.toLowerCase();
        // check if user already exists
        const user_exist = await db.query(
            `SELECT * FROM ${userTable} WHERE email_lowercased = '${email_lowercased}'`
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
                var email_confirmed_token = buf.toString('hex');
                var date = new Date();
                var token_expired =
                    Date.now() + config.email_confirm_token_expiration;
                var email_confirm_token_expiration = new Date(token_expired);
                let phoneJSON = `{"mobile": ${phone}}`;

                const rows = await db.query(
                    `INSERT INTO ${userTable} SET email = '${email}', email_lowercased = '${email_lowercased}', password = '${hash}', email_confirm_token = '${email_confirmed_token}', created_at = '${date}', updated_at = '${date}', email_confirm_token_expired = '${email_confirm_token_expiration}', first_name = '${firstName}', last_name = '${lastName}' , phone = '${phone}'`
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
                    html: `<strong>Please click this link to verify an email. <a>${process.env.DOMAIN_HOST}/signup/verify-email/${user_id}/${email_confirmed_token}</a>`,
                });

                resolve({
                    status: 200,
                    message: 'User has been registered!',
                    user: {
                        user_id,
                        email,
                        token,
                        email_confirmed_status: false,
                    },
                });
            });
        });
    });
};

/**
 * Log In Function
 * @param {string} email
 * @param {string} password
 */
exports.login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        const email_lowercased = email.toLowerCase();
        // check if user already exists
        const user_exist = await db.query(
            `SELECT * FROM ${userTable} WHERE email_lowercased = '${email_lowercased}'`
        );

        // user doesn't exists
        if (user_exist.length === 0) {
            reject({ status: 404, message: 'Cannot find the user!' });
            return;
        }
        const user = user_exist[0];
        // user exists ...
        const userPassword = user.password;
        //compare the password
        bcrypt.compare(password, userPassword).then(function (result) {
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
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: email,
                        phone: user.phone,
                        location: user.location,
                        active_status: user.active_status,
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
 * Email Verification
 * @param {int} userId
 * @param {string} token
 */
exports.email_verification = (userId, token) => {
    return new Promise(async (resolve, reject) => {
        const user_exist = await db.query(
            `SELECT email_confirm_token FROM ${userTable} WHERE id = '${userId}'`
        );

        // user doesn't exists
        if (user_exist.length === 0) {
            reject({ status: 404, message: 'Cannot find the user!' });
            return;
        }

        const email_token = user_exist[0]['email_confirm_token'];

        if (token === email_token) {
            const randomToken = makeid(10);
            const update_active_status = await db.query(
                `UPDATE ${userTable} SET active_status = 1, email_confirm_token='${randomToken}' WHERE id = '${userId}'`
            );
            const res = await db.query(
                `SELECT * FROM ${userTable} WHERE id = '${userId}'`
            );
            const user = res[0];

            const token = jwt.sign(
                {
                    data: user.email,
                },
                config.jwtSecret,
                { expiresIn: '1d' }
            );

            resolve({
                status: 200,
                message: 'Email Confirmed!',
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    location: user.location,
                    active_status: user.active_status,
                    token,
                },
            });
        } else {
            reject({ status: 401, message: 'Unauthorized request!' });
        }
    });
};

/**
 * Forgot Password Request
 * @param {string} email
 */
exports.forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        const email_lowercased = email.toLowerCase();
        const user_exist = await db.query(
            `SELECT id FROM ${userTable} WHERE email_lowercased = '${email_lowercased}'`
        );

        // user doesn't exists
        if (user_exist.length === 0) {
            reject({ status: 404, message: "That email doesn't exist ..." });
            return;
        } else {
            const id = user_exist[0]['id'];
            crypto.randomBytes(32, async function (ex, buf) {
                var password_reset_token = buf.toString('hex');
                var token_expired =
                    Date.now() + config.password_reset_expiration;
                var password_reset_token_expired = new Date(token_expired)
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' ');
                const setResetToken = await db.query(
                    `UPDATE ${userTable} SET password_reset_token = '${password_reset_token}', password_reset_token_expired='${password_reset_token_expired}' WHERE id = '${id}'`
                );

                // send email
                await transporter.sendMail({
                    from: config.donotreply_email,
                    to: email,
                    subject: 'Reset the password',
                    html: `<strong>Please click this link to reset a password. https://joinmori.com/forgotPassword/${id}/${password_reset_token}`,
                });

                resolve({
                    status: 200,
                    message: 'Reset the password!',
                });
            });
        }
    });
};

/**
 * Set Forgot Password
 * @param {int} userId
 * @param {string} token
 * @param {string} password
 */
exports.setForgotPassword = (userId, token, password) => {
    return new Promise(async (resolve, reject) => {
        const user_exist = await db.query(
            `SELECT password_reset_token FROM ${userTable} WHERE id = '${userId}'`
        );

        // user doesn't exists
        if (user_exist.length === 0) {
            reject({ status: 404, message: 'Cannot find the user!' });
            return;
        }

        const password_reset_token = user_exist[0]['password_reset_token'];

        if (token === password_reset_token) {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                // something went wrong
                if (err) {
                    reject({
                        status: 500,
                        message: 'Internal server error ...',
                    });
                    return;
                }

                const randomToken = makeid(10);
                const update_user_password = await db.query(
                    `UPDATE ${userTable} SET password_reset_token = '${randomToken}', password='${hash}' WHERE id = '${userId}'`
                );

                resolve({
                    status: 200,
                    message: 'Password Reset!',
                });
            });
        } else {
            reject({ status: 401, message: 'Unauthorized request!' });
        }
    });
};

/**
 * Delete User Account
 * @param {int} userId
 */

exports.deleteAccount = (request) => {
    return new Promise(async (resolve, reject) => {
        const { data } = checkToken(request);

        if (data) {
            const { userId } = request.body;

            const deletedAccount = await db.query(
                `DELETE from ${userTable} where id = ${userId}`
            );

            resolve({
                status: 200,
                message: 'User Account Deleted!',
            });
        } else {
            reject({ status: 401, message: 'Unauthorized request!' });
        }
    });
};

exports.authenticate_token = (request) => {
    return new Promise(async (resolve, reject) => {
        const { data } = checkToken(request);
        if (data) {
            const email_lowercased = data.toLowerCase();
            const user_exist = await db.query(
                `SELECT * FROM ${userTable} WHERE email_lowercased = '${email_lowercased}'`
            );

            // user doesn't exists
            if (user_exist.length === 0) {
                reject({ status: 404, message: 'Cannot find the user!' });
                return;
            }

            const user = user_exist[0];

            resolve({
                status: 200,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    location: user.location,
                    active_status: user.active_status,
                },
            });
        } else {
            reject({ status: 401, message: 'Unauthorized request!' });
        }
    });
};
