const BaseModal = require("../Base.model");

class CategoryModels extends BaseModal {


    async getCategories() {

        try {

            const getSql = `
                SELECT 
                c.id, 
                c.name, 
                c.description,
                COUNT(bck.book_id) AS total_book
            FROM 
                book_category c
            LEFT JOIN 
                book_category_relation bck 
            ON 
                c.id = bck.category_id
            GROUP BY 
                c.id, c.name, c.description
          `;
            return await this.preparingQuery(getSql);

        } catch (error) {
            console.error("Error in Geting Category modal " + error);
            return { status: false, message: error };
        }

    }

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
module.exports = new CategoryModels();