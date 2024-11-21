const nodemailer = require('nodemailer');

const handelingTransport = {
    transporter: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_GMAIL,
            pass:  process.env.GMAIL_KEY
        }
    })
}

module.exports = handelingTransport;