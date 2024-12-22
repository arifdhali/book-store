const BaseModal = require("../Base.model");

class BookModels extends BaseModal {
    async AddBook(data) {
        const {
            user_id, category_id, title, price, quantity, bookThumbnail, status, date } = data;
        try {
            // TABLE NAME ARE HERE======>
            const BOOK_TABLE = 'book';
            const RELATION_TABLE = 'book_category_relation';

            const insertQuery = `
                INSERT INTO ${BOOK_TABLE} 
                (author_id, category_id, name, price, quantity, thumbnail, status, publication_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const insertResult = await this.preparingQuery(insertQuery, [user_id, category_id, title, price, quantity, bookThumbnail, status, date]);

            if (insertResult.affectedRows >= 1) {
                const book_id = insertResult.insertId;
                const insertRelationQuery = `INSERT INTO ${RELATION_TABLE} (book_id, category_id) VALUES (?, ?)`;
                const relationResult = await this.preparingQuery(insertRelationQuery, [book_id, category_id]);

                if (relationResult.affectedRows >= 1) {
                    return {
                        status: true,
                        message: "Book added successfully."
                    };
                } else {
                    return {
                        status: false,
                        message: "Failed to establish book-category relation."
                    };
                }
            } else {
                return {
                    status: false,
                    message: "Failed to add the book to the database."
                };
            }
        } catch (error) {
            console.error('Error in AddBook method:', error.message || error.sqlMessage);
            return {
                status: false,
                message: "An error occurred while adding the book to the database."
            };
        }
    }
}

module.exports = new BookModels();