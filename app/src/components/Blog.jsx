import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Nav from "./Nav";

const Blog = ({ isDarkMode, toggleMode }) => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogRef);
        if (blogSnapshot.exists()) {
          setBlog(blogSnapshot.data());
        } else {
          console.log("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : "light"} flex flex-col`}>
      <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <div className="flex flex-col gap-6 text-justify w-full items-center mt-10up">
        <h1 className="text-1x+ flex gap-20 Large:text-2xl font-bold">
          <span  className="">{blog.title}</span>
         
        </h1>
        <span className="text-1x text-gray-500">{blog.date}</span>

        <p className="w-90c Large:w-2/3">{blog.content}</p>
      </div>
    </div>
  );
};

export default Blog;
