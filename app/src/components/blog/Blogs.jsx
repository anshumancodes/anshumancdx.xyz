import React, { useState, useEffect } from "react";
import Nav from "../Nav";

import { db, cms_db_id, blog_collection_id,ID } from "../../config/appwriteconfig";
import parse from 'html-react-parser';

import { Link } from "react-router-dom";

import Footer from "../Footer";




const Blogs = ({ isDarkMode, toggleMode }) => {
  const [blogs, setBlog] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await db.listDocuments(cms_db_id, blog_collection_id);
        const sortedBlogs = response.documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlog(sortedBlogs);
        console.log(typeof(blogs[1].content))
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again.");

      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className={`h-full ${isDarkMode ? "dark" : "light"} flex flex-col`}>
      <Nav toggleMode={toggleMode} isDarkMode={isDarkMode} />
    

      <section className="py-20">
        <h1 className="mb-12 text-center text-5xl font-bold">
          Recent Posts
        </h1>
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {blogs ? (
            blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className=" rounded-lg shadow-md  overflow-hidden" style={{ height: '400px' }}>
                <div className="h-[20vh]">
                  <img src={blog.coverImg} alt={blog.title} className="h-[80%] w-full object-cover" />
                </div>
                <div className="px-5">
                 
                  <h2 className="text-2xl mb-2">{blog.title}</h2>
                  <p className="text-gray-600">{blog.content ? parse(blog.content.replace(/<figure.*?>.*?<\/figure>/, '').slice(0,100)+" ..."): "No Blog intro found"}</p>
                  <a href={`/blog/${blog.$id}`} className="text-blue-500 block mt-3">Read more</a>
                </div>
              </div>
            
              ))
            ) : (
              <p className="w-full flex justify-center items-center h-full">
                No blogs available
              </p>
            )
          ) : (
            <p className="w-full flex justify-center items-center">
             Loading....
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
