import { lazy } from "react";
const AdminHome = lazy(() => import("./AdminHome"));
const Users = lazy(() => import("./users/Users"));
const Authors = lazy(() => import("./authors/Authors"));
// const Subscription = lazy(() => import("./authors/Subscription"));
const Login = lazy(() => import("./auth/Login"));
const ForgotPass = lazy(() => import("./auth/Forgot-pass"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"))
const AddAuthor = lazy(() => import("./authors/Add"));
const EditAuthor = lazy(() => import("./authors/Edit"));
const Category = lazy(() => import("./category/Category"));
const CategoryAdd = lazy(() => import("./category/Add"));
const Orders = lazy(() => import("./OrdersList"));
const ALL_BOOKS = lazy(() => import("./All_books"));

export {
    AdminHome,
    Users,
    Authors,
    // Subscription,
    Login,
    ForgotPass,
    ResetPassword,
    AddAuthor,
    EditAuthor,
    Category,
    CategoryAdd,
    Orders,
    ALL_BOOKS
}