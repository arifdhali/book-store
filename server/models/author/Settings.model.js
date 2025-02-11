const FileServices = require("../../services/FileServices");
const BaseModal = require("../Base.model");
const bcrypt = require("bcrypt")
class Settings extends BaseModal {
    constructor(tableName) {
        super(),
            this.tableName = tableName

    }

    async GetInformationOfUsers(id) {
        try {
            const selectSql = `
                SELECT 
                    name, email, profile_img, bio, dob, address, 
                    phone_no, social_link 
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

    async UpdateInformationOfUsers(userID, data) {

        try {
            const columnsMap = {
                // key: actual databse column name
                first_name: "first_name",
                email: "email",
                profile_img: "profile_img",
                bio: "bio",
                dob: "dob",
                address: "address",
                phone_no: "phone_no",
                social_link: "social_link",
            }
            let keys = [],
                values = [];
            for (let key in columnsMap) {
                if (data.hasOwnProperty(key) && columnsMap[key] !== undefined) {
                    keys.push(`${columnsMap[key]} = ?`);
                    values.push(data[key]);
                }
            }
            if (keys.length == 0) {
                throw new Error("No columns provided for update");
            }
            values.push(userID);

            // old image
            let oldImgsql = `SELECT profile_img FROM ${this.tableName} WHERE id = ?`;
            let selectOldProfile = await this.preparingQuery(oldImgsql, userID);
            let oldImage = selectOldProfile[0].profile_img;

            let updateSql = `UPDATE ${this.tableName} SET ${keys.join(", ")} WHERE id = ? `;
            let result = await this.preparingQuery(updateSql, values);
            if (result.affectedRows >= 1) {
                try {
                    if (oldImage && data.profile_img) {
                        await FileServices.deleteFile(oldImage, 'author');
                    }
                } catch (error) {
                    console.error("Error while deleting the old profile :", error.message);
                }
                return {
                    status: true,
                    message: 'Updated successfully',
                }
            } else {
                return {
                    status: false,
                    message: "Something went wrong!",
                };
            }
        } catch (error) {
            console.error("Error in UpdateInformationOfUsers:", error.message);
            return {
                status: false,
                message: "An error occurred while updating user information.",
                error: error.message,
            };
        }
    }
}

module.exports = Settings;
