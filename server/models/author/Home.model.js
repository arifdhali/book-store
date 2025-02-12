const BaseModal = require("../Base.model");

class HomeModelsAuthor extends BaseModal {
    constructor(tableName, id) {
        super(),
            this.tableName = tableName,
            this.userId = id
    }
    async Dashboard(userID) {
        try {
            if (!userID) throw new Error("Author id is required");
            let authorSql = `SELECT A.id,A.name,A.email,A.profile_img,A.status,S.subscription_type FROM ${this.tableName} A
                             LEFT JOIN subscription S
                             ON A.id = S.author_id
                             WHERE A.id = ?`;
            let author = await this.preparingQuery(authorSql, [userID]);
            if (author[0]) {
                let authors = author[0];
                return {
                    status: true,
                    message: "Dashboard data retrieved successfully",
                    authors
                }
            } else {
                throw new Error(`Provided id=${userID} is not correct`);
            }
        } catch (error) {
            console.error("Error in Author Dashboard :", error);
            return {
                status: false,
                message: "An error occurred while author Dashboard.",
                error: error.message,
            };
        }
    }

}

module.exports = new HomeModelsAuthor('author');