const { add, format } = require("date-fns");
const BaseModal = require("../Base.model");
const bcrypt = require('bcrypt');


class AdminAuthModels extends BaseModal {

    async LoginModels(data) {
        const { email, password } = data;
        let sql = "SELECT * FROM admin WHERE email = ? ";
        try {
            const [user] = await this.preparingQuery(sql, [email]);

            if (!user) {
                return {
                    message: "User not found",
                    status: false
                };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    message: "Incorrect password",
                    status: false
                };
            }
            const updateSql = "UPDATE admin SET last_active = NOW() WHERE email = ?";
            await this.preparingQuery(updateSql, [email])

            return {
                message: "Login successful",
                status: true
            };

        } catch (error) {
            console.error("Error in Admin Auth modal " + error);
            return { success: false, message: "Database error" };
        }
    }
    async insertForgotTokens(hashedToken, userEmail, userRole, expiresTime) {

        try {
            let user = await this.preparingQuery('SELECT email FROM admin WHERE email = ?', [userEmail]);
            if (!user.length >= 1) {
                return {
                    status: false,
                    message: "Email not found",
                }
            }
            // let expiresTime = format(add(new Date(), { minutes: 10 }), 'yyyy-MM-dd HH:mm:ss');
            let insertTokenSql = `INSERT INTO reset_tokens(token,expires_at,user_email,user_role) VALUES(?,?,?,?)`;
            let insertTokenStatus = await this.preparingQuery(insertTokenSql, [hashedToken, expiresTime, userEmail, userRole])
            if (insertTokenStatus.affectedRows) {
                return {
                    status: true,
                    message: "Reset token inserted successfully"
                }
            } else {
                throw new Error("Insert token failed");
            }
        } catch (error) {
            console.log('Error on insertForgotTokens', error)
            return {
                status: false,
                message: 'Error inserting' + error
            }
        }

    }

    async ResettingPassword(token, password) {
        let { getToken, status } = await this.checkingTheTokensAreValid(token);
        if (!status) {
            return {
                getToken
            }
        }        
        const { user_email, user_role } = getToken[0];
        let hashingPassword = await bcrypt.hash(password, 10);
        let UpdatePassword = `UPDATE ${user_role} SET password = ? WHERE email = ?`;
        let restingPassword = await this.preparingQuery(UpdatePassword, [hashingPassword, user_email])
        if (!restingPassword.affectedRows >= 1) {
            return {
                status: false,
                message: 'Password reset failed! Please try again.'
            }
        } else {

            setTimeout(async () => {
                 await this.preparingQuery(`DELETE FROM reset_tokens WHERE user_email = ? AND token = ?`, [user_email, token]);
                console.log('Delete token from reset_token after successfully reset password');
            }, 2000);
            return {
                status: true,
                message: "Password has been reset successfully."
            }
        }



    }

    async checkingTheTokensAreValid(token) {
        let hasedToken = `SELECT token,user_email,user_role FROM reset_tokens WHERE expires_at > NOW() AND token = ?`;
        let getToken = await this.preparingQuery(hasedToken, [token]);
        if (getToken.length < 1) {
            return {
                status: false,
                message: "Invalid token. Please request a new password reset."
            }
        } else {
            return {
                status: true,
                getToken
            };
        }

    }
}

module.exports = new AdminAuthModels();
