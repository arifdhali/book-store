const express = require("express");
const author_protected_routes = express.Router();
const HomepageController = require("../controllers/author/Home.Controller");
const uploadMulter = require("../utils/multer");
const { AddBookController, BookListController, EditBookController, GetSingleBookController, DeleteBookController, CategoriesController } = require("../controllers/author/Book.controller");
const { AddCouponController, GetAllCoupons, DeleteCouponsController } = require("../controllers/author/Coupon.controller");
const { GetSubscription } = require("../controllers/author/Subscription.controller");
const { GetOrderContoller } = require("../controllers/author/Order.controller");
const { GetSettingController, UpdateSettingController } = require("../controllers/author/Settings.controller");

const uploadBook = uploadMulter("book");
const uploadAuthor = uploadMulter("author")

author_protected_routes.get("/", HomepageController)
author_protected_routes.post("/book/add", uploadBook.single("thumbnail"), AddBookController);
author_protected_routes.get("/book/list", BookListController);
author_protected_routes.get("/book/categories", CategoriesController);
author_protected_routes.get("/book/:book_id", GetSingleBookController);
author_protected_routes.patch("/book/:book_id", uploadBook.single("thumbnail"), EditBookController);
author_protected_routes.delete("/book/:book_id", DeleteBookController)

author_protected_routes.post("/coupon/add", AddCouponController);
author_protected_routes.get("/coupon", GetAllCoupons);
author_protected_routes.delete("/coupon/:couponID", DeleteCouponsController);

author_protected_routes.get("/subscription", GetSubscription);

author_protected_routes.get("/order", GetOrderContoller);
author_protected_routes.get("/settings", GetSettingController);
author_protected_routes.patch("/settings", uploadAuthor.single('profileImage'), UpdateSettingController)

module.exports = author_protected_routes;