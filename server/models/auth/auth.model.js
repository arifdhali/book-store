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
}

module.exports = AdminAuthModels;
