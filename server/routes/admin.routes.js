const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout } = require("../controllers/auth/admin.controller");
const  validAdminVerify  = require("../middleware/verify.auth");
const { AddAuthorController, GetAllAuthorsController, GetSpecificAuthor, DeleteAuthor } = require("../controllers/admin/author.controller");
const uploadMulter = require("../utils/multer");
const { AddCategoryController, AllCategoryController } = require("../controllers/admin/category.controller");



adminRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})

// author
const uploadAuthor = uploadMulter("author");
adminRoute.post("/authors/add", uploadAuthor.single('profile_img'), AddAuthorController);
adminRoute.get("/authors/list", GetAllAuthorsController);

adminRoute.get("/authors/:authorid", GetSpecificAuthor);
adminRoute.delete('/authors/:authorid', DeleteAuthor);



// add category
adminRoute.get("/category", AllCategoryController);
adminRoute.post("/category/add", AddCategoryController);


// auth
adminRoute.post("/login", AdminLogin);
adminRoute.post("/logout", AdminLogout);

module.exports = adminRoute;