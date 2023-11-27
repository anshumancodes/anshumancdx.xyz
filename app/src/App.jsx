import React, { useState } from "react";

import Blogs from "./components/Blogs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Addblogs from "./components/Addblogs";
import Blog from "./components/Blog";
import Adminlogin from "./components/Adminlogin";

function App() {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode((isDarkMode) => !isDarkMode);
  };

  // for admin auth
  const [isAdminLoggedIn, setAdminLoggedIn] = React.useState(false);

  const handleAdminLogin = (isLoggedIn) => {
    setAdminLoggedIn(isLoggedIn);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home isDarkMode={isDarkMode} toggleMode={toggleMode} />}
          />
          <Route
            path="/blogs"
            element={<Blogs isDarkMode={isDarkMode} toggleMode={toggleMode} />}
          />

          <Route
            path="/blog/:id"
            element={<Blog isDarkMode={isDarkMode} toggleMode={toggleMode} />}
          />
          
          {/* Routes for admin */}
          <Route
            path="/admin/*"
            element={
              isAdminLoggedIn ? (
                // Render the admin routes only if logged in
                <Routes>
                  <Route path="/createblog" element={<Addblogs />} />
                </Routes>
              ) : (
                // Redirect to admin login if not logged in
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/login"
            element={<Adminlogin onLogin={handleAdminLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

