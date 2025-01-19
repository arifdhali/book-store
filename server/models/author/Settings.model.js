const BaseModal = require("../Base.model");

class Settings extends BaseModal {
    constructor(tableName) {
        super(),
            this.tablename = tableName

    }

    async GetInformationOfUsers(id) {
        try {
            const selectSql = `
                SELECT 
                    name, email, profile_img, bio, dob, address, 
                    phone_no, social_link, password 
                FROM 
                    ${this.tableName}
                WHERE 
                    id = ?;
            `;

            const author = await this.preparingQuery(selectSql, [id]);

            if (Array.isArray(author) && author.length > 0) {
                return {
                    status: true,
                    message: "Successfully retrieved user information.",
                    author
                };
            } else {
                return {
                    status: false,
                    message: "No user found with the provided ID.",
                };
            }
        } catch (error) {
            console.error("Error in GetInformationOfUsers:", error.message);
            return {
                status: false,
                message: "An error occurred while fetching user information.",
                error: error.message,
            };
        }
    }
}

module.exports = new Settings();
