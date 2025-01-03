const express = require("express");
const authorRoute = express.Router();
const validAuthorVerify = require("../middleware/verify.auth");
const { AuthorLogin, AuthorLogout, AuthorRegister } = require("../controllers/auth/author.controller");
const HomepageController = require("../controllers/author/Home.Controller");
const uploadMulter = require("../utils/multer");
const { AddBookController, BookListController, EditBookController, GetSingleBookController, DeleteBookController } = require("../controllers/author/Book.controller");

const uploadAuthor = uploadMulter("author");
const uploadBook = uploadMulter("book");


authorRoute.get("/", validAuthorVerify, HomepageController)
authorRoute.post("/book/add", uploadBook.single("thumbnail"), AddBookController);
authorRoute.get("/book/list", BookListController);
authorRoute.get("/book/:book_id", GetSingleBookController);
authorRoute.patch("/book/:book_id", uploadBook.single("thumbnail"), EditBookController);
authorRoute.delete("/book/:book_id", DeleteBookController)


// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/register", uploadAuthor.single('thumbnail'), AuthorRegister);
authorRoute.post("/logout", AuthorLogout);

module.exports = authorRoute;