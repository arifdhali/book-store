const { transporter } = require('./Transporter');

class EmailController {
    // Sending mail
    async #preparingMail(content) {
        const { to_user, subject, html } = content;
        try {
            let mailOptions = {
                from: process.env.ADMIN_GMAIL,
                to: to_user,
                subject: subject,
                html: html
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } catch (error) {

        }
    }

    // global for sending email
    async sendingMailData(content) {
        return this.#preparingMail(content);
    }


}

module.exports = EmailController;