const BaseModal = require("../Base.model");

class CategoryModels extends BaseModal {

    async addCategory(name, description) {

        try {
            const value = [
                name,
                description
            ]
            const addSql = 'INSERT INTO book_category(name,description) VALUES(?,?)';
            await this.preparingQuery(addSql, value);
            return {
                status: true,
                message: "Admin created successfully"
            }
        } catch (error) {
            console.error("Error in Admin Category modal " + error);
            return { status: false, message: error };
        }
    }

    async checkCategory(name) {
        try {
            const checkSql = 'SELECT id FROM book_category WHERE name = ?';
            return await this.preparingQuery(checkSql, name);
         

        }
        catch (error) {
            console.error("Error in Admin Category modal " + error);
            return { status: false, message: error };
        }

    }

}
module.exports = CategoryModels;