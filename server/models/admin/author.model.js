const FileServices = require("../../services/FileServices");
const Subscription = require("../subscription.model")
const BaseModal = require("../Base.model");
const pagination = require("../../utils/pagination");
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
            let subscription = await Subscription.setSubscriptionsPack(authorID, subscription_type);
            if (subscription.status) {
                return {
                    status: true,
                    message: "Admin created successfully"
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
    async getAuthors(end, limit, sortBy) {
        try {
            const { search, status } = sortBy;
            let sortingSql = '';
            let values = [];
            if (search) {
                sortingSql += `WHERE name LIKE ? `;
                values.push(`%${search}%`);
            }
            if (status) {
                sortingSql += `${search ? 'AND' : 'WHERE'} status = ? `;
                values.push(status);
            }
            sortingSql += ` ORDER BY created_at DESC LIMIT ${Number(limit)} OFFSET ${Number(end)}`;
            if (limit && end) {
                values.push(limit);
                values.push(end);
            }
            const getSql = `SELECT id, name, email, profile_img, bio, created_at, status FROM author ${sortingSql}`;
            let author = await this.preparingQuery(getSql, values);
            if (author.length > 0) {
                return {
                    status: true,
                    author
                }
            } else {
                return {
                    status: true,
                    messge: "No search results found"
                }
            }
        } catch (error) {
            console.error("Error when getting all Authors: " + error);
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



}

module.exports = new AuthorModels();