const BaseModal = require("../Base.model");
const bcrypt = require('bcrypt');
const AuthorModels = require("../admin/author.model")


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
                user_name: user.name,
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
        const { first_name, last_name, email, hasedPassword } = data;        
        try {
            let dbColum = {
                name: first_name,
                email: email,
                password: hasedPassword
            }
            let columnName = Object.keys(dbColum).join(",");
            let columnValues = Object.values(dbColum)
            let placeHolder = columnValues.map(() => '?').join(', ')
            let user = await AuthorModels.checkUserExists(email)
            if (!user.status) {
                return user;
            } else {
                const insersql = `INSERT INTO author(${columnName}) VALUES(${placeHolder})`
                let response = await this.preparingQuery(insersql, columnValues)
                if (response.affectedRows >= 1) {
                    return {
                        message: "Your account has been successfully created.",
                        status: true
                    }
                }

            }
        } catch (error) {
            console.error("Error in Author Auth Register: " + error);
            return { success: false, message: "Database error" };
        }
    }

}

module.exports = new AuthorAuthModels();
