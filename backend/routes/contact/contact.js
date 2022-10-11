require('dotenv').config();
const db = require('../../services/db');

const contactTable = 'contact_form';

// create a new contact
exports.createContact = (name, email, message, phone) => {
    return new Promise(async (resolve, reject) => {
        if (!name || !email || !message || !phone) {
            let message = '';
            !name ? (message += 'Name is required. ') : '';
            !email ? (message += 'Email is required. ') : '';
            !message ? (message += 'Message is required. ') : '';
            !phone ? (message += 'Phone is required. ') : '';

            return reject({ status: 400, message });
        }

        const contact = await db.query(
            `INSERT INTO contact_form (id, name, email, message, phone) VALUES (NULL, '${name}', '${email}', '${message}', '${phone}')`
        );

        resolve({ status: 201, message: 'Contact created successfully' });
    });
};

// get all contacts
exports.getContacts = () => {
    return new Promise(async (resolve, reject) => {
        const contacts = await db.query(`SELECT * FROM ${contactTable}`);
        resolve({ status: 200, contacts });
    });
};
