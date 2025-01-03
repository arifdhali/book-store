const authorRoute = require("../../routes/author.routes");
const BaseModal = require("../Base.model");
class AuthorModels extends BaseModal {

    async addAuthor(data, subscription_type) {
        try {
            const insertSql = "INSERT INTO author(name, email,profile_img,bio,password) VALUES (?,?,?,?,?)";
            const authorResult = await this.preparingQuery(insertSql, data);
            const authorID = authorResult.insertId;
            let insertSubscriptionSql = `INSERT INTO subscription (author_id,subscription_type,book_quantity) VALUES(?,?,?)`;
            let allowdBookCount = 0;
            switch (subscription_type) {
                case 'free':
                    allowdBookCount = 10;
                    break;
                case 'standard':
                    allowdBookCount = 30;
                    break;
                case 'premium':
                    allowdBookCount = 10000;
                    break;
                default:
                    allowdBookCount = 0;
                    throw new Error("Invalid subscription type. Must be 'free', 'standard', or 'premium'.");

            }
            await this.preparingQuery(insertSubscriptionSql, [authorID, subscription_type, allowdBookCount]);
            return {
                status: true,
                message: "Admin created successfully"
            }
        } catch (error) {
            console.error("Error in Admin Author modal " + error);
            return { status: false, message: error };
        }

    }
    async singleAuthor(data) {
        try {
            let singleSql = 'SELECT id, name,email,bio,profile_img ,status FROM author WHERE id = ?';
            return await this.preparingQuery(singleSql, [data]);
        } catch (error) {
            console.error("Error in when get single Author  " + error);
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

    async updateAuthor(id, data) {
        const fields = [];
        const values = [];
        for (let [key, value] of Object.entries(data)) {
            if (value !== undefined && value !== null) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }
        let updateQuery = `UPDATE author SET ${fields} WHERE id = ?`;
        try {
            const result = await this.preparingQuery(updateQuery, [...values, id]);
            if (result.affectedRows) {
                return {
                    status: true,
                    message: "Update successfully"
                }
            }
        } catch (error) {
            console.error('Error in when update author')
        }

    }

    async deleteAuthor(data) {
        try {
            const delteSql = 'DELETE FROM author WHERE id = ?';
            let result = await this.preparingQuery(delteSql, [data]);
            if (result.affectedRows >= 1) {
                return {
                    status: true,
                    message: "Author delete successfully"
                }
            }
        } catch (error) {
            console.error("Error in when  delte Author  " + error);
            return { status: false, message: error };
        }


    }
}

module.exports = new AuthorModels();