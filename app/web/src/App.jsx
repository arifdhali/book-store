import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { AdminLayout } from './layouts';
import { AdminHome, ManageAuthor, Settings } from './pages/admin';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        {/* Admin routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path='manage' element={<ManageAuthor />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        {/* Author routes */}

      </Routes>
    </Router>
  )
}

export default App
