const express = require("express");
const admin_protected_routes = express.Router();
const { AddAuthorController, GetAllAuthorsController, GetSpecificAuthor, DeleteAuthor, UpdateAuthorsController } = require("../controllers/admin/author.controller");
const uploadMulter = require("../utils/multer");
const { AddCategoryController, AllCategoryController, DeleteCategoryController } = require("../controllers/admin/category.controller");
const { GetAllBooksController } = require("../controllers/admin/book.controller");


admin_protected_routes.get("/", (req, res) => {
    res.send("Working");
})

// author
const uploadAuthor = uploadMulter("author");
admin_protected_routes.post("/authors/add", uploadAuthor.single('profile_img'), AddAuthorController);
admin_protected_routes.get("/authors/list", GetAllAuthorsController);
admin_protected_routes.patch("/authors/:authorid", uploadAuthor.single('profile_img'), UpdateAuthorsController);
admin_protected_routes.get("/authors/:authorid", GetSpecificAuthor);
admin_protected_routes.delete('/authors/:authorid', DeleteAuthor);

// category
admin_protected_routes.get("/category", AllCategoryController);
admin_protected_routes.post("/category/add", AddCategoryController);
admin_protected_routes.delete("/category/:cat_ID", DeleteCategoryController)

// all books
admin_protected_routes.get("/all-books", GetAllBooksController);


module.exports = admin_protected_routes;
