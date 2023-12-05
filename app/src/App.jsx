import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Addblogs = lazy(() => import("./components/Addblogs"));
const Blog = lazy(() => import("./components/Blog"));
const Adminlogin = lazy(() => import("./components/Adminlogin"));
const Blogs = lazy(() => import("./components/Blogs"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} toggleMode={toggleMode} />} />
            <Route path="/blogs" element={<Blogs isDarkMode={isDarkMode} toggleMode={toggleMode} />} />
            <Route path="blog/:slug" element={<Blog isDarkMode={isDarkMode} toggleMode={toggleMode} />} />

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
            <Route path="/admin/login" element={<Adminlogin onLogin={handleAdminLogin} />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
