import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, cms_db_id, blog_collection_id, ID } from "../../config/appwriteconfig";
import Nav from "../Nav";
import { IoMdShare } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import parse from 'html-react-parser';
import { Query } from "appwrite";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [error, setError] = useState(null); // Added state for error handling
  const { slug } = useParams();
  const { isDarkMode } = useContext(DarkModeContext);
  // Function to calculate the read time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 225; // Adjust as needed
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    setReadingTime(time);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Fetch blog where document ID matches the slug
        const blogData = await db.getDocument(cms_db_id, blog_collection_id, slug);
  
        setBlog(blogData);
        calculateReadingTime(blogData.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch the blog. Please try again.");
      }
    };
    fetchBlog();
  }, [slug]);
  

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  // Function to copy the blog link to the clipboard
  const copyLink = () => {
    const inputElement = document.createElement("input");
    inputElement.value = window.location.href;
    document.body.appendChild(inputElement);
    inputElement.select();
    const success = document.execCommand("copy");
    document.body.removeChild(inputElement);
    if (success) {
      alert("Link successfully copied.");
    } else {
      alert("Unable to copy to clipboard.");
    }
  };

  return (
    <>
    <Nav />
    <div className={`h-full flex ${isDarkMode ? "dark" : "light"} flex-col w-full items-center`}>
     
      <span className="w-80c">
        <a href="/blog" aria-label="go back to blogs">
          <IoIosArrowRoundBack className="text-2x rounded-[50%] border-white-color border-[2px]" />
        </a>
      </span>

      <article className="flex flex-col w-90c items-center mt-10up justify-center">
        <span className="Large:text-left">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <span className="text-sky-500">—</span>
              <time className="text-gray-400 text-sm">
                {new Date(blog.createdAt).toLocaleDateString()}
              </time>
              <i></i>
              <i></i>
              <time className="text-gray-400 text-sm">{`${readingTime} min read`}</time>
            </div>
            <div className="flex gap-4 text-1x+">
              <IoMdShare onClick={copyLink} className="cursor-pointer" />
              <a href="https://twitter.com/anshumancdx" className="cursor-pointer">
                <FaXTwitter />
              </a>
            </div>
          </div>

          <h1 className="mt-4 text-xl font-bold flex justify-center w-full Large:text-2x">
            {blog.title}
          </h1>
        </span>
       
        <div className="prose pl-1 pr-1 lg:w-full  mt-5 flex w-full flex-col items-center">
          <p className="w-[99%] lg:w-full prose lg:prose-xl text-gray-400 prose-gray prose-strong:text-gray-200 prose-h2:text-gray-300 prose-h4:text-gray-400">
            {parse(blog.content)}
          </p>
        </div>
      </article>
    </div>
    </>
  );
};

export default Blog;

