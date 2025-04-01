import React, { lazy, Suspense, useContext } from "react";
import {Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Core Pages (Avoid Lazy Loading Critical Routes)
import Home from "./Pages/Home/Home";
import Blogs from "./components/blog/Blogs";
import Blog from "./components/blog/Blogpost";

// Lazy Loaded Pages
const AdminLogin = lazy(() => import("./components/admin/Adminlogin"));
const Business = lazy(() => import("./Pages/business/FreelanceLanding"));
const Cms = lazy(() => import("./Pages/Cms/Cms.jsx"));
const BlogEditor = lazy(() => import("./components/blog/BlogEditor.jsx"));
const ManageBlogs = lazy(() => import("./components/blog/ManageBlogs"));

function App() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${isDarkMode ? "dark" : "light"} h-full`}>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Routes>
          {/* Core Routes (No Lazy Loading) */}
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

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;


