const BaseModal = require("../Base.model");
class AuthorModels extends BaseModal {

    async addAuthor(data) {
        try {
            const insertSql = "INSERT INTO author(name, email,profile_img,bio,password) VALUES (?,?,?,?,?)";
            await this.preparingQuery(insertSql, data);
            return {
                status: true,
                message: "Admin created successfully"
            }
        } catch (error) {
            console.error("Error in Admin Author modal " + error);
            return { status: false, message: error };
        }

    }

    async getAuthors(data) {
        try {
            const getSql = `SELECT id, name, email, profile_img, bio, status 
            FROM author 
            WHERE status = ?`;
            return await this.preparingQuery(getSql, [data]);
        } catch (error) {
            console.error("Error in when get all Author  " + error);
            return { status: false, message: error };
        }
    }

    async checkUserExists(email) {
        let checkQuery = 'SELECT email FROM author WHERE email = ?';
        try {
            return await this.preparingQuery(checkQuery, [email]);
        }
        catch (error) {
            console.error("Error in when check Author  " + error);
            return { status: false, message: error };
        }


    }
}

module.exports = AuthorModels;