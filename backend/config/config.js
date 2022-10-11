const config = {
    jwtSecret: 'Bellapartybus',
    admin_email: 'admin@bellapartybus.com',
    support_email: 'support@bellapartybus.com',
    info_email: 'info@bellapartybus.com',
    donotreply_email: 'info@bellapartybus.com',
    password_reset_expiration: 3600000, //for an hour
    email_confirm_token_expiration: 3600000, //for an hour
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
};

module.exports = config;
