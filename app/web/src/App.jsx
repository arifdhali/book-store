import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { AdminLayout } from './layouts';
import { AdminHome, Users, Subscription } from './pages/admin';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        {/* Admin routes */}
        <Route path='/admin/' element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path='users' element={<Users />} />
          <Route path='subscriptions' element={<Subscription />} />
        </Route>

        {/* Author routes */}
        <Route path='*' element={"Wrong"} />
      </Routes>
    </Router>
  )
}

export default App
