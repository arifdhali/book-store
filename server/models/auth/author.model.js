const BaseModal = require("../Base.model");
const bcrypt = require('bcrypt');


class AuthorAuthModels extends BaseModal {

    async LoginModels(data) {
        const { email, password } = data;
        let sql = `
        SELECT A.id,A.name, A.profile_img, A.password, A.status, S.subscription_type
        FROM author A
        JOIN subscription S
        ON A.id = S.author_id
        WHERE A.email = ? `;
        try {
            const [user] = await this.preparingQuery(sql, [email]);
            if (!user) {
                return {
                    message: "User not found",
                    status: false
                };
            }
            const { status } = user;
            if (status !== 'active') {
                return {
                    message: `Your account is ${status}, please contact to the Admin`,
                    status: false
                };
            }

            const userinfo = {
                user_id: user.id,
                user_name:user.name,
                user_profile: user.profile_img,
                user_status: user.status,
                subscription_type: user.subscription_type,                
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
