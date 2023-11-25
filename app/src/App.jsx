import React, { useState } from "react";
import Nav from "./components/Nav";
// import Me from "./components/Me";
// import Introduction from "./components/Introduction";
// import Path from "./components/Path";
// import PopularBlogs from "./components/PopularBlogs";
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
          <Route path="/createblog" element={<Addblogs />} />
          {/* Add the route for individual blog posts */}
          <Route
            path="/blog/:id"
            element={<Blog isDarkMode={isDarkMode} toggleMode={toggleMode} />}
          />

          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <>
                  {/* The Addblogs component is nested under /admin route */}
                  <Route path="/createblog" element={<Addblogs />} />
                  {/* You can add more admin-related routes here */}
                </>
              ) : (
                // If not logged in, redirect to admin login
                <Navigate to="/admin/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
    // <div><Addblogs/></div>
  );
}

export default App;
