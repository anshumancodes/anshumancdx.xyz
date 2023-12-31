import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';
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
   // to calculate the read time
   const calculateReadingTime = (text) => {
    const wordsPerMinute = 225; // Adjust as needed
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    setReadingTime(time);
  };
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


  // const transform = (node, index) => {
  //   if (node.type === 'tag' && node.name === 'img') {
  //     // Customize the rendering of image tags as needed
  //     return <img key={index} src={node.attribs.src} alt={node.attribs.alt} />;
  //   }

  //   // Return null to use default rendering for other elements
  //   return null;
  // };
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
              <a href="https://twitter.com/anshumancdx"  className="cursor-pointer" ><FaXTwitter /></a>
              
            </div>
          </div>

          <h1 className="mt-4 text-xl font-bold  Large:text-2x">
            {blog.title}
          </h1>
        </span>
        <img  src={blog.primaryimg} alt={blog.title} className="mt-5gen w-300pwx Large:w-600pwx" />
        <div className="mt-5gen flex flex-col gap-2 items-center w-full text-left">
          <span className=" w-90c Large:w-50c">{ReactHtmlParser(blog.content)}</span>
        </div>
      </article>
    </div>
  );
};

export default Blog;
