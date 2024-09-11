import React, { useState, lazy, Suspense ,useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";

const Home = lazy(() => import("./components/landing/Home"));
const Addblogs = lazy(() => import("./components/blog/Addblogs"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Adminlogin = lazy(() => import("./components/admin/Adminlogin"));
const Blogs = lazy(() => import("./components/blog/Blogs"));
const Business=lazy(()=>import ("./components/business/FreelanceLanding"))


function App() {
  const { isDarkMode } = useContext(DarkModeContext);
  // for admin auth
  const [isAdminLoggedIn, setAdminLoggedIn] = React.useState(false);

  const handleAdminLogin = (isLoggedIn) => {
    setAdminLoggedIn(isLoggedIn);
  };
  
  return (
    <div className={` ${isDarkMode ? "dark" : "light"} h-full`}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs  />} />
            <Route path="blog/:slug" element={<Blog  />} />
            <Route path="/business" element={<Business  />} />

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
