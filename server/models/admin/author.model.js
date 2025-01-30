const FileServices = require("../../services/FileServices");
const BaseModal = require("../Base.model");
class AuthorModels extends BaseModal {

    async addAuthor(data, subscription_type) {
        try {
            const { author_name, email, author_image, bio, hashed_password } = data
            let exists = await this.checkUserExists(email);
            if (!exists.status) {
                return exists;
            }
            const insertSql = "INSERT INTO author(name, email,profile_img,bio,password) VALUES (?,?,?,?,?)";
            const authorResult = await this.preparingQuery(insertSql, [author_name, email, author_image, bio, hashed_password]);
            const authorID = authorResult.insertId;
            let insertSubscriptionSql = `INSERT INTO subscription (author_id,subscription_type,subscription_price,book_quantity,book_limit,coupons_limit,order_margin) VALUES(?,?,?,?,?,?,?)`;
            const subscriptionFeatures = {}
            switch (subscription_type) {
                case 'free':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 0,
                        bookQuantity: 10,
                        book_limit: 10,
                        coupons_limit: 10,
                        orderMargin: "30%"
                    })
                    break;
                case 'standard':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 399,
                        bookQuantity: 40,
                        book_limit: 30,
                        coupons_limit: 20,
                        orderMargin: "20%"
                    })
                    break;
                case 'premium':
                    Object.assign(subscriptionFeatures, {
                        subscription_price: 699,
                        bookQuantity: null,
                        book_limit: null,
                        coupons_limit: null,
                        orderMargin: null,
                    })
                    break;
                default:
                    throw new Error("Invalid subscription type. Must be 'free', 'standard', or 'premium'.");
            }
            const { bookQuantity, subscription_price, book_limit, coupons_limit, orderMargin } = subscriptionFeatures;
            let subscriptionResult = await this.preparingQuery(insertSubscriptionSql, [authorID, subscription_type, subscription_price, bookQuantity, book_limit, coupons_limit, orderMargin]);
            if (subscriptionResult.affectedRows) {
                let subsctionID = subscriptionResult.insertId;
                let isRelationID = await this.insertIdToSubscriptionAuthorRelations(authorID, subsctionID);
                if (isRelationID.affectedRows > 0) {
                    return {
                        status: true,
                        message: "Admin created successfully"
                    }
                }
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
            let user = await this.preparingQuery(checkQuery, [email]);
            if (user.length > 0) {
                return {
                    status: false,
                    message: "Email already exists"
                }
            } else {
                return {
                    status: true
                }
            }
        } catch (error) {
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
            let thumbnailQuery = `SELECT id AS User_id, profile_img FROM author WHERE id IN (?)`;
            let thumbnailResult = await this.preparingQuery(thumbnailQuery, [id]);
            if (!thumbnailResult.length) {
                return {
                    status: false,
                    message: "Author thumbnail not found"
                };
            }
            const deleteSql = 'DELETE FROM author WHERE id IN(?)';
            let result = await this.preparingQuery(deleteSql, [id]);

            if (result.affectedRows >= 1) {
                for (let item of thumbnailResult) {
                    if (item.profile_img) {
                        try {
                            let profileDeleteResult = await FileServices.deleteFile(item.profile_img, "author");
                            console.log('Profile image deleted:', profileDeleteResult);
                        } catch (fileError) {
                            console.error(`Failed to delete file: ${item.profile_img}`, fileError);
                        }
                    }
                }
                return {
                    status: true,
                    message: "Author deleted successfully"
                };
            } else {
                return {
                    status: false,
                    message: "Author deletion failed"
                };
            }
        } catch (error) {
            console.error("Error when deleting Author: ", error);
            return { status: false, message: error.message };
        }
    }


    async insertIdToSubscriptionAuthorRelations(authorID, subsctionID) {
        try {
            let tableName = `subscription_author_relation`;
            if (!authorID && !subsctionID) {
                throw new Error("Insert id not found")
            }
            let insertSql = `INSERT INTO ${tableName} (author_id,subscription_id ) VALUES(?,?)`;
            return await this.preparingQuery(insertSql, [authorID, subsctionID])
        } catch (error) {
            console.error("Error in when  inserting into subsctiption realtion  " + error);
            return { status: false, message: error.message };
        }
    }
}

module.exports = new AuthorModels();