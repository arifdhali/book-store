import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout, AuthLayout, AuthorLayout } from './layouts';
import { AdminHome, Users, Authors, Login, ForgotPass, AddAuthor, Category, EditAuthor, CategoryAdd, Orders, ALL_BOOKS } from './pages/admin';
import { Author_Login, Author_Forgotpass, BookList, AddBook, Coupon, OrderList, SingleOrderView, MySubscription, ReaderFeedback, BookAnalytics, Author_Register, EditBook, Settings } from './pages/author';
import AppRoute from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './pages/Home';
import ErrorPage from "./404";
import Loader from './components/Loader';
import AuthorHome from './pages/author/AuthorHome';
import ProtectedRoutes from './routes/protected.routes';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={2000} newestOnTop hideProgressBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Main routes */}
          <Route path={AppRoute.HOME} element={<Home />} />

          {/* AUTH PAGES FOR ADMIN */}
          <Route path={AppRoute.HOME} element={<AuthLayout />}>
            <Route path={AppRoute.AUTH.ADMIN.LOGIN} element={<Login />} />
            <Route path={AppRoute.AUTH.ADMIN.FORGOTPASS} element={<ForgotPass />} />
          </Route>
          {/* AUTH PAGES FOR AUTHOR */}
          <Route path={AppRoute.HOME} element={<AuthLayout />}>
            <Route path={AppRoute.AUTH.AUTHOR.LOGIN} element={<Author_Login />} />
            <Route path={AppRoute.AUTH.AUTHOR.FORGOTPASS} element={<Author_Forgotpass />} />
            <Route path={AppRoute.AUTH.AUTHOR.REGISTER} element={<Author_Register />} />
          </Route>

          {/* Admin routes */}
          <Route path={AppRoute.ADMIN.BASE} element={<ProtectedRoutes roleOfUser='admin'><AdminLayout /></ProtectedRoutes>}>
            <Route index element={<AdminHome />} />
            <Route path={AppRoute.ADMIN.BOOKS.ALL_BOOKS} element={<ALL_BOOKS />} />
            <Route path={AppRoute.ADMIN.CATEGORY.LIST} element={<Category />} />
            <Route path={AppRoute.ADMIN.CATEGORY.ADD} element={<CategoryAdd />} />
            <Route path={AppRoute.ADMIN.AUTHORS.BASE} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.LIST} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.ADD} element={<AddAuthor />} />
            <Route path={AppRoute.ADMIN.AUTHORS.VIEW(':id')} element={<EditAuthor />} />
            <Route path={AppRoute.ADMIN.USERS} element={<Users />} />
            <Route path={AppRoute.ADMIN.ORDERS.BASE} element={<Orders />} />
          </Route>

          {/* Author routes */}
          <Route path={AppRoute.AUTHOR.BASE} element={<ProtectedRoutes roleOfUser={'author'}> <AuthorLayout /></ProtectedRoutes>}>
            <Route index element={<AuthorHome />} />
            <Route path={AppRoute.AUTHOR.BOOK.LIST} element={<BookList />} />
            <Route path={AppRoute.AUTHOR.BOOK.ADD} element={<AddBook />} />
            <Route path={AppRoute.AUTHOR.BOOK.SINGLE(":BOOK_ID")} element={<EditBook />} />
            <Route path={AppRoute.AUTHOR.COUPON.BASE} element={<Coupon />} />
            <Route path={AppRoute.AUTHOR.BOOK.ANALYTICS(":id")} element={<BookAnalytics />} />
            <Route path={AppRoute.AUTHOR.ORDER} element={<OrderList />} />
            <Route path={AppRoute.AUTHOR.SINGLE_ORDER(":id")} element={<SingleOrderView />} />
            <Route path={AppRoute.AUTHOR.MY_SUBSCRIPTION} element={<MySubscription />} />
            <Route path={AppRoute.AUTHOR.READER_FEEDBACK} element={<ReaderFeedback />} />
            <Route path={AppRoute.AUTHOR.SETTINGS} element={<Settings />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
