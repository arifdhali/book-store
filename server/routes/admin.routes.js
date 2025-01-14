const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout } = require("../controllers/auth/admin.controller");
const validAdminVerify = require("../middleware/verify.auth");
const { AddAuthorController, GetAllAuthorsController, GetSpecificAuthor, DeleteAuthor, UpdateAuthorsController } = require("../controllers/admin/author.controller");
const uploadMulter = require("../utils/multer");
const { AddCategoryController, AllCategoryController,DeleteCategoryController } = require("../controllers/admin/category.controller");



adminRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})

// author
const uploadAuthor = uploadMulter("author");
adminRoute.post("/authors/add", uploadAuthor.single('profile_img'), AddAuthorController);
// all list
adminRoute.get("/authors/list", GetAllAuthorsController);
// edit
adminRoute.patch("/authors/:authorid", uploadAuthor.single('profile_img'), UpdateAuthorsController);

//  get specific authors
adminRoute.get("/authors/:authorid", GetSpecificAuthor);
adminRoute.delete('/authors/:authorid', DeleteAuthor);



// add category
adminRoute.get("/category", AllCategoryController);
adminRoute.post("/category/add", AddCategoryController);
adminRoute.delete("/category/:cat_ID",DeleteCategoryController)


// auth
adminRoute.post("/login", AdminLogin);
adminRoute.post("/logout", AdminLogout);

module.exports = adminRoute;