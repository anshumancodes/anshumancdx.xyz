import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";
import BlogEditor from "./components/blog/BlogEditor";
import Cms from "./Pages/Cms/Cms";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy loaded components
const Home = lazy(() => import("./Pages/Home/Home"));
const Blog = lazy(() => import("./components/blog/Blogpost"));
const Adminlogin = lazy(() => import("./components/admin/Adminlogin"));
const Blogs = lazy(() => import("./components/blog/Blogs"));
const Business = lazy(() => import("./Pages/business/FreelanceLanding"));
const ManageBlogs = lazy(() => import("./components/blog/ManageBlogs"));

function App() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={` ${isDarkMode ? "dark" : "light"} h-full`}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="blog/:slug" element={<Blog />} />
            <Route path="/business" element={<Business />} />

            {/* Protected CMS Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cms" element={<Cms />} />
              <Route path="/cms/create" element={<BlogEditor />} />
              <Route path="/cms/manage" element={<ManageBlogs />} />
            </Route>

            {/* Admin login */}
            <Route path="/admin/login" element={<Adminlogin />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;


