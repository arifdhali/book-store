import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout, AuthLayout, AuthorLayout } from './layouts';
import { AdminHome, Users, Subscription, Authors, Login, ForgotPass, AddAuthor, Category, EditAuthor, CategoryAdd } from './pages/admin';
import { Author_Login, Author_Forgotpass } from './pages/author';
import AppRoute from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './pages/Home';
import ErrorPage from "./404";
import Loader from './components/Loader';
import AuthorHome from './pages/author/AuthorHome';

const App = () => {
  return (
    <Router>
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
          </Route>

          {/* Admin routes */}
          <Route path={AppRoute.ADMIN.BASE} element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path={AppRoute.ADMIN.CATEGORY.LIST} element={<Category />} />
            <Route path={AppRoute.ADMIN.CATEGORY.ADD} element={<CategoryAdd />} />
            <Route path={AppRoute.ADMIN.AUTHORS.BASE} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.LIST} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.ADD} element={<AddAuthor />} />
            <Route path={AppRoute.ADMIN.AUTHORS.SUBSCRIPTIONS} element={<Subscription />} />
            <Route path={`${AppRoute.ADMIN.AUTHORS.VIEW(':id')}`} element={<EditAuthor />} />
            <Route path={AppRoute.ADMIN.USERS} element={<Users />} />
          </Route>

          <Route path={AppRoute.AUTHOR.BASE} element={<AuthorLayout />}>
            <Route index element={<AuthorHome />} />
            <Route path={AppRoute.AUTHOR.BOOK_LIST} element={<Authors />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
