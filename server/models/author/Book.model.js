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
    async GetAllBooks(userid) {
        const getQuery = `
            SELECT 
               B.id,
                B.name, 
                B.price, 
                B.quantity, 
                B.thumbnail, 
                B.status,
                B.publication_date,
                R.rating_value
            FROM 
                book B 
            LEFT JOIN 
                rating R 
            ON 
                R.author_id = B.author_id 
            WHERE 
                B.author_id = ?`;

        try {
            const books = await this.preparingQuery(getQuery, [userid]);
            return {
                status: true,
                message: "Book fetch successfull",
                books
            }
        } catch (err) {
            console.error("Error fetching books: ", err);
            throw err;
        }
    }
    async GetSingleBook(id) {
        try {
            const { book_id, author } = id;
            let selectBook = `SELECT 
                                  B.id as book_id,
                                  B.name ,
                                  B.price,
                                  B.quantity,
                                  B.thumbnail,
                                  B.status,
                                  B.publication_date,
                                  C.id as category_id,
                                  C.name AS category_name
                              FROM 
                                  book B
                              LEFT JOIN 
                                  book_category C ON B.category_id = C.id
                              WHERE 
                                  B.id = ? AND author_id = ? `
            let book = await this.preparingQuery(selectBook, [book_id, author]);
            if (book.length > 0) {
                return {
                    status: true,
                    message: "Fetching book success",
                    book,
                }
            } else {
                return {
                    status: false,
                    message: "No Books found based on the book id and author id",
                }
            }
        } catch (err) {
            console.error("Error fetching single books: ", err);
            throw err;
        }


    }

    async EditBook(id, data) {
        console.log(id,data)
    }

}

module.exports = new BookModels();