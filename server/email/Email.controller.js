const { transporter } = require('./Transporter');

class EmailController {
    // Sending mail
    async #preparingMail(content) {
        const { to_user, subject, html } = content;
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: `Book-Store-${process.env.ADMIN_GMAIL}`,
                to: to_user,
                subject: subject,
                html: html
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject({
                        error,
                        status: false,
                    });
                } else {
                    resolve({
                        info,
                        status: true,
                    });
                }
            });
        });
    }

    // Global function for sending email
    async sendingMailData(content) {
        try {
            const result = await this.#preparingMail(content);
            return result;
        } catch (error) {
            console.error("Error sending email:", error);
            return error;
        }
    }
}

module.exports = EmailController;
