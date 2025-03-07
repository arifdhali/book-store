const FileServices = require("../../services/FileServices");
const BaseModal = require("../Base.model");
class BookModels extends BaseModal {
    constructor(tableName) {
        super();
        this.tableName = tableName;
    }
    async AddBook(data, subscription_types) {
        const { user_id, category_id, title, price, quantity, bookThumbnail, status, date } = data;
        try {
            let subscriptionLimit = `
                SELECT 
                    S.author_id,
                    COUNT(B.id) AS book_count,                    
                    S.book_limit as max_book_limit,
                    S.book_quantity as max_book_quantity
                FROM 
                    subscription S
                LEFT JOIN 
                    book B
                ON 
                    B.author_id = S.author_id
                WHERE 
                    S.author_id = ? AND S.subscription_type = ?
                GROUP BY 
                    S.author_id,
                    S.book_limit,
                    S.book_quantity
            `;
            let limitQuery = await this.preparingQuery(subscriptionLimit, [user_id, subscription_types]);
            // Check if limit is exceeded or at the limit
            if (limitQuery[0]) {
                const { book_count, max_book_limit, max_book_quantity } = limitQuery[0];
                if (quantity > max_book_quantity) {
                    return {
                        status: false,
                        message: "You cannot add more than the allowed quantity for a single book."
                    };
                }
                if (book_count >= max_book_limit) {
                    return {
                        status: false,
                        message: "You have reached the maximum number of books you can add."
                    };
                }
            }
            // Proceed with adding the book if the limit is not exceeded
            const insertQuery = `
                INSERT INTO ${this.tableName} 
                (author_id, category_id, name, price, quantity, thumbnail, status, publication_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const insertResult = await this.preparingQuery(insertQuery, [user_id, category_id, title, price, quantity, bookThumbnail, status, date]);
            if (insertResult.affectedRows >= 1) {
                return {
                    status: true,
                    message: "Book added successfully."
                };
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
                message: "An error occurred while adding the book to the database.",
                error: error.message,
            };
        }
    }
    async GetAllBooks(userid) {
        try {
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

            const books = await this.preparingQuery(getQuery, [userid]);
            if (Array.isArray(books) && books.length >= 0) {
                return {
                    status: true,
                    message: "Successfully retrieved books information.",
                    books
                }
            } else {
                return {
                    status: false,
                    message: "No books found with the provided ID.",
                };
            }
        } catch (error) {
            console.error("Error fetching books: ", error.message);
            return {
                status: false,
                message: "An error occurred while fetching books information.",
                error: error.message,
            };
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
                                  C.name AS category_name,
                                  S.book_quantity                                
                              FROM 
                                  book B
                              LEFT JOIN 
                                  book_category C ON B.category_id = C.id
                              INNER JOIN 
                                 subscription S ON B.author_id = S.author_id
                              WHERE 
                                  B.id = ? AND B.author_id = ? `
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
        } catch (error) {
            console.error("Error fetching single books: ", error.message);
            return {
                status: false,
                message: "An error occurred while fetching single books information.",
                error: error.message,
            };
        }


    }

    async EditBook(id, data) {
        try {
            // Database columns in the correct sequence
            const columnsMap = {
                title: "name",
                price: "price",
                quantity: "quantity",
                thumbnail: "thumbnail",
                status: "status",
            };
            let keys = [];
            let values = [];
            for (let i in columnsMap) {
                if (data[i] !== undefined) {
                    keys.push(`${columnsMap[i]} = ?`);
                    values.push(data[i])
                }
            }
            if (keys.length === 0) {
                throw new Error("No valid fields provide for update");
            }
            values.push(id)
            let updateQuery = `UPDATE ${this.tableName} SET ${keys.join(", ")} WHERE id = ?`;

            let result = await this.preparingQuery(updateQuery, values);
            if (result.affectedRows >= 1) {
                return {
                    status: true,
                    message: "Book Update successfully"
                }
            }
        } catch (error) {
            console.error("Error in EditBook:", error);
            return {
                status: false,
                message: "An error occurred while upddate books information.",
                error: error.message,
            };
        }
    }

    async deleteBookModels(data) {
        try {
            const { book_id, userID } = data;
            // Fetch the book thumbnail
            let thumbnailSql = `SELECT thumbnail FROM ${this.tableName} WHERE author_id = ? AND id = ?`;
            let thumbnailResult = await this.preparingQuery(thumbnailSql, [userID, book_id]);
            if (!thumbnailResult.length) {
                return {
                    status: false,
                    message: "Book thumbnail not found"
                };
            }

            let deleteQuery = `DELETE FROM ${this.tableName} WHERE author_id = ? AND id = ?`;
            let result = await this.preparingQuery(deleteQuery, [userID, book_id]);
            if (result.affectedRows >= 1) {
                let { thumbnail } = thumbnailResult[0];
                let thumDeleteResult;

                if (thumbnail) {
                    thumDeleteResult = await FileServices.deleteFile(thumbnail, "book");
                }

                return {
                    status: true,
                    message: "Book deleted successfully",
                };
            } else {
                return {
                    status: false,
                    message: "Failed to delete book",
                };
            }
        } catch (error) {
            console.error("Error in Book delete:", error);
            return {
                status: false,
                message: "An error occurred while delete book information.",
                error: error.message,
            };
        }
    }

    async getAllCategories() {
        let result = await this.preparingQuery(`SELECT id,name FROM book_category`, []);
        if (result.length > 0) {
            return {
                status: true,
                category: result
            }
        } else {
            console.error("Error in getAllCategories:", error);
            return {
                status: false,
                message: "An error occurred while geting categories book information.",
                error: error.message,
            };
        }
    }

}
module.exports = BookModels;
