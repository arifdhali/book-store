const BaseModal = require("../Base.model");

class CategoryModels extends BaseModal {


    async getCategories() {

        try {

            const getSql = `
                SELECT 
                bc.id, 
                bc.name, 
                bc.description,
                COUNT(B.id) AS total_book
            FROM 
            book_category bc 
            LEFT JOIN 
            book B
            ON 
                B.category_id = bc.id
            GROUP BY 
                bc.id, 
                bc.name, 
                bc.description
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
                message: "Category created successfully"
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
    async checkCategoryIsUsedOrNot(id) {
        try {
            let checkSql = `SELECT 
                            B.author_id,BC.id as category_Id, A.name as author_name, 
                            B.name as book_name, B.id as book_id
                            FROM book_category BC
                            JOIN book B ON B.category_id = BC.id
                            JOIN author A ON B.author_id = A.id
                            WHERE BC.id = ?`;
            let result = await this.preparingQuery(checkSql, [id]);
            if (result.length > 0) {
                const { author_name } = result[0];
                return {
                    status: true,
                    message: `${author_name} is use this category`
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async delteCategory(id) {
        try {
            // before deleting check if category is used or not !
            let categoryUsedORnot = await this.checkCategoryIsUsedOrNot(id);            
            if (categoryUsedORnot?.status) {
                return {
                    status: false,
                    message: categoryUsedORnot?.message
                }
            }
            const deleteSql = `DELETE FROM book_category WHERE id = ?`;
            let result = await this.preparingQuery(deleteSql, [id])
            if (result.affectedRows >= 1) {
                return {
                    status: true,
                    message: "Category delete successfully"
                }
            }

        } catch (error) {
            console.log('Delete category modal', error)
            throw error;
        }
    }

}
module.exports = new CategoryModels();