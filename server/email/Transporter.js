const nodemailer = require('nodemailer');

const handelingTransport = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_GMAIL,
            pass: 'appkey'
        }
    })
}

module.exports = handelingTransport;