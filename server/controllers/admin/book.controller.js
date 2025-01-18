const BookModel = require("../../models/admin/Book.model")
const GetAllBooksController = async (req, res) => {
    try {

        let result = await BookModel.GetAllBooks();
        const { books, status, message } = result;
        if (status) {
            return res.status(200).json({
                status: true,
                message: message,
                books
            });
        } else {
            return res.status(500).json({
                status: false,
                message: result?.message || "Failed to get book",
            });
        }
    } catch (error) {
        console.error("Error in BookListController:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error
        });
    }

}

module.exports = {
    GetAllBooksController
}