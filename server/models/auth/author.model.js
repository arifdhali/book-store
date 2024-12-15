const BaseModal = require("../Base.model");
const bcrypt = require('bcrypt');


class AuthorAuthModels extends BaseModal {

    async LoginModels(data) {
        const { email, password } = data;
        let sql = "SELECT * FROM author WHERE email = ? ";
        try {
            const [user] = await this.preparingQuery(sql, [email]);
            if (!user) {
                return {
                    message: "User not found",
                    status: false
                };
            }
            const userinfo = {
                user_id: user.id,
                user_profile: user.profile_img,
                user_status: user.status
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    message: "Incorrect password",
                    status: false
                };
            }
            const updateSql = "UPDATE author SET last_active = NOW() WHERE email = ?";
            await this.preparingQuery(updateSql, [email])

            return {
                message: "Login successful",
                status: true,
                role: 'author',
                userinfo
            };

        } catch (error) {
            console.error("Error in Author Auth modal " + error);
            return { success: false, message: "Database error" };
        }
    }

    async RegisterModel(data) {
        const { email } = data;
        let sql = "SELECT id, email FROM author WHERE email = ?";

        try {
            const user = await this.preparingQuery(sql, [email]);
            if (user.length > 0) {
                return {
                    message: "User already exists",
                    status: false
                };
            } else {
                const fields = Object.keys(data);
                const placeholders = fields.map(() => "?").join(", ");
                const values = Object.values(data);
                console.log(placeholders,values)
                const insertSql = `INSERT INTO author (${fields.join(", ")}) VALUES (${placeholders})`;
                const result = await this.preparingQuery(insertSql, values);
                return {
                    message: "Author registered successfully",
                    status: true,
                    result
                };
            }
        } catch (error) {
            console.error("Error in Author Auth Register: " + error);
            return { success: false, message: "Database error" };
        }
    }

}

module.exports = new AuthorAuthModels();
