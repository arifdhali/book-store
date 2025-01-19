// const BookModel = require("../../models/author/Book.model");
const BookModels = require("../../models/author/Book.model");
const BookModel = new BookModels("book");
const AddBookController = async (req, res) => {
    try {
        const { user_id, category_id, title, date, quantity, price, status, subscription_type } = req.body;
        const thumbnail = req.file;

        if (!thumbnail) {
            return res.status(400).json({
                status: false,
                message: "No thumbnail uploaded",
            });
        }
        const bookThumbnail = thumbnail.filename;
        // Prepare data to be passed to the BookModel
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
        const result = await BookModel.AddBook(data, subscription_type);
        if (result?.status) {
            return res.status(201).json({
                status: true,
                message: result.message,
            });
        } else {
            return res.json(result);
        }
    } catch (error) {
        console.error("Error in AddBookController:", error.message);
        return res.status(500).json({
            status: false,
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};
const BookListController = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (user_id === undefined || user_id === null) {
            return res.status(403).json({
                status: false,
                message: "User id not valid"
            })
        }

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
    } catch (error) {
        console.error("Error in BookListController:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }

}
const GetSingleBookController = async (req, res) => {
    try {
        const { book_id } = req.params;
        const { author } = req.query;
        if (book_id === undefined || book_id === null) {
            return res.status(403).json({
                status: false,
                message: "User id not valid"
            })
        }
        const userIDS = {
            book_id,
            author
        }
        let result = await BookModel.GetSingleBook(userIDS);
        return res.json({
            result
        })
    } catch (error) {
        console.error("Error in GetSingleBookController:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }

}
const EditBookController = async (req, res) => {
    try {
        const { book_id } = req.params;
        const thumbnail = req.file;
        const filteredValue = {};

        for (let key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== null) {
                filteredValue[key] = req.body[key];
            }
        }
        if (thumbnail) {
            filteredValue.thumbnail = thumbnail.filename;
        }
        let updateResult = await BookModel.EditBook(book_id, filteredValue);
        return res.json(updateResult)
    } catch (error) {
        console.error("Error in EditBookController:", error.message);
        return res.status(500).json({
            status: false,
            message: error.message || "Internal server error",
        });
    }
}

const DeleteBookController = async (req, res) => {
    const { book_id } = req.params
    const { userID } = req.query

    let result = await BookModel.deleteBookModels({ book_id, userID })
    return res.json(result)

}
module.exports = {
    AddBookController,
    GetSingleBookController,
    BookListController,
    EditBookController,
    DeleteBookController
};
