const BaseModal = require("../Base.model");
class BookModel extends BaseModal {
    constructor(tableName) {
        super();
        this.tableName = tableName;
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
                            A.name AS author_name,
                            BC.name AS category
                        FROM 
                            book B
                        JOIN 
                            author A ON B.author_id = A.id
                        JOIN 
                            book_category BC ON BC.id = B.category_id`;

        try {
            const books = await this.preparingQuery(getQuery);
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
}
module.exports = new BookModel();
