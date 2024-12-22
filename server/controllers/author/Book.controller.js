const BookModel = require("../../models/author/Book.model")

const AddBookController = (req, res) => {
    const { title, date, quantity, price, status } = req.body;
    const thumbnail = req?.file;
    if (!thumbnail) {
        return res.json({
            status: false,
            message: "No thumbnail uploaded",
        });
    }
    const bookThumbnail = thumbnail?.filename;
    const result = BookModel.AddBook([user_id, title, date, quantity, price, bookThumbnail, status])
    return res.status(201).json({
        result
    })


}

module.exports = {
    AddBookController,
}