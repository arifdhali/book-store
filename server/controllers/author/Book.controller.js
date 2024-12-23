const BookModel = require("../../models/author/Book.model");

const AddBookController = async (req, res) => {
    try {
        const { user_id, category_id, title, date, quantity, price, status } = req.body;
        const thumbnail = req.file;
        if (!thumbnail) {
            return res.status(400).json({
                status: false,
                message: "No thumbnail uploaded",
            });
        }
        const bookThumbnail = thumbnail.filename;

        const data = {
            user_id,
            category_id,
            title,
            price,
            quantity,
            bookThumbnail,
            status,
            date,
        }
        const result = await BookModel.AddBook(data);
        if (result?.status) {
            return res.status(201).json({
                status: true,
                message: result.message,
            });
        } else {
            return res.status(500).json({
                status: false,
                message: result?.message || "Failed to add the book",
            });
        }
    } catch (error) {
        console.error("Error in AddBookController:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const BookListController = async (req, res) => {
    const { user_id } = req.query;
    let result = await BookModel.GetAllBooks(user_id);
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

}





module.exports = {
    AddBookController,
    BookListController
};
