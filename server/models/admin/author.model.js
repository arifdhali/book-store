const FileServices = require("../../services/FileServices");
const BaseModal = require("../Base.model");
class AuthorModels extends BaseModal {

    async addAuthor(data, subscription_type) {
        try {
            const insertSql = "INSERT INTO author(name, email,profile_img,bio,password) VALUES (?,?,?,?,?)";
            const authorResult = await this.preparingQuery(insertSql, data);
            const authorID = authorResult.insertId;
            let insertSubscriptionSql = `INSERT INTO subscription (author_id,subscription_type,book_quantity,book_limit,coupons_limit,order_margin) VALUES(?,?,?,?,?,?)`;

            const subscriptionFeatures = {}
            switch (subscription_type) {
                case 'free':
                    Object.assign(subscriptionFeatures, {
                        bookQuantity: 10,
                        book_limit: 10,
                        coupons_limit: 10,
                        orderMargin: "30%"
                    })
                    break;
                case 'standard':
                    Object.assign(subscriptionFeatures, {
                        bookQuantity: 40,
                        book_limit: 30,
                        coupons_limit: 20,
                        orderMargin: "20%"
                    })
                    break;
                case 'premium':
                    Object.assign(subscriptionFeatures, {
                        bookQuantity: null,
                        book_limit: null,
                        coupons_limit: null,
                        orderMargin: null,
                    })
                    break;
                default:
                    throw new Error("Invalid subscription type. Must be 'free', 'standard', or 'premium'.");
            }
            const { bookQuantity, book_limit, coupons_limit, orderMargin } = subscriptionFeatures;
            await this.preparingQuery(insertSubscriptionSql, [authorID, subscription_type, bookQuantity, book_limit, coupons_limit, orderMargin]);
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
    async getAuthors() {
        try {
            const getSql = `SELECT id, name, email, profile_img, bio, status 
            FROM author `;
            return await this.preparingQuery(getSql, []);
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

    async deleteAuthor(id) {
        try {
            //  get the thumbnail
            let thumbnailQuery = `SELECT id as User_id,profile_img FROM author WHERE id = ?`;
            let thumbnailResult = await this.preparingQuery(thumbnailQuery, [id])
            if (!thumbnailResult.length) {
                return {
                    status: false,
                    message: "Author thumbnail not found"
                };
            }

            const delteSql = 'DELETE FROM author WHERE id = ?';
            let result = await this.preparingQuery(delteSql, [id]);
            if (result.affectedRows >= 1) {
                let { profile_img } = thumbnailResult[0];
                let profileDeleteResult;
                if (profile_img) {
                    profileDeleteResult = await FileServices.deleteFile(profile_img, "author")
                }
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