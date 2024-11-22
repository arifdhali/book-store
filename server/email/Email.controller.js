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
                    return {
                        error,
                        status: false,
                    }
                } else {
                    return {
                        info,
                        status: true,
                    };
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