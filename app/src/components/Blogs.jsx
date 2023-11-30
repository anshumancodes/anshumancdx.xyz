import React, { useState } from "react";
import Nav from "./Nav";
// import fb from "../firebase";
import { useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Link } from "react-router-dom";


const Blogs = ({ isDarkMode, toggleMode }) => {
  const [blogs, setblog] = useState();
  //   const Blogs=collection(db,'blogs');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const blogsSnapshot = await getDocs(blogsRef);
        const blogsList = blogsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setblog(blogsList);
        
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : "light"} flex flex-col` }>
      <Nav toggleMode={toggleMode} isDarkMode={isDarkMode}/>
      <div >
      {blogs ? (
  blogs.length > 0 ? (
    blogs.map((blog) => (
      <div
        key={blog.id}
        className="flex gap-4 w-full px-8 py-3 mb-6 justify-center"
      >
        {/*  */}
        <div className={`${isDarkMode ? "darkbtnbg" : "lightbtnbg"} flex flex-col w-80c p-3 rounded-medium-card`}>
          <span className="flex gap-2 Large:flex   flex-wrap  justify-between" ><h2 className="  Large:font-bold text-1x+">{blog.title}</h2> <p>{blog.date}</p> </span>
          <p className="mt-5gen" >{blog.content.split(" ").slice(0,80).join(" ")}<Link to={`/blog/${blog.id}`} className="text-blue-500"> read more</Link></p>
        </div>
        {/*  */}


      </div>
    ))
  ) : (
    <p>No blogs available</p>
  )
) : (
  <p>loading...</p>
)}

      </div>
    </div>
  );
};

export default Blogs;
