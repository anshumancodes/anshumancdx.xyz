import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Nav from "./Nav";
import { IoMdShare } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Blog = ({ isDarkMode, toggleMode }) => {
  const [blog, setBlog] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  const { slug } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", slug);
        const blogSnapshot = await getDoc(blogRef);

        if (blogSnapshot.exists()) {
          setBlog(blogSnapshot.data());
          calculateReadingTime(blogSnapshot.data().content);
        } else {
          console.log("blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <p>Loading...</p>;
  }
  // to make the blog link copy to share
  const copyLink = () => {
    const inputElement = document.createElement("input");
    inputElement.value = window.location.href;
    document.body.appendChild(inputElement);
    inputElement.select();
    const success = document.execCommand("copy");
    document.body.removeChild(inputElement);
    if (success) {
      alert("successfully copied link");
    } else {
      alert("Unable to copy to clipboard.");
    }
  };

  // to calculate the read time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 225; // Adjust as needed
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    setReadingTime(time);
  };

  return (
    <div className={`h-fit ${isDarkMode ? "dark" : "light"} flex flex-col w-full items-center`}>
      <Nav isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <article className="flex flex-col w-90c items-center mt-10up">
        <span className=" Large:text-left">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <span className="text-sky-500">—</span>
              <time className="text-gray-400 text-sm">{blog.date}</time>
              <i></i>
              <i></i>
              <time className="text-gray-400 text-sm">{`${readingTime} min read`}</time>
            </div>
            <div className="flex gap-4 text-1x+">
              <IoMdShare onClick={copyLink} className="cursor-pointer" />
              <FaXTwitter />
            </div>
          </div>

          <h1 className="mt-4 text-xl font-bold  Large:text-2x">
            {blog.title}
          </h1>
        </span>

        <div className="mt-5gen flex flex-col gap-2 items-center w-full text-left ">
          <p dangerouslySetInnerHTML={{ __html: blog.intro }} />
          <p dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </div>
  );
};

export default Blog;
