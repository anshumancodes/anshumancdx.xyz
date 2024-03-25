import React, { useState, useEffect } from "react";
// import ReactHtmlParser from 'react-html-parser';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Nav from "./Nav";
import { IoMdShare } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import parse from 'html-react-parser';

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
      <span className=" w-80c"><a href="/blogs" aria-label="go back to blogs"><IoIosArrowRoundBack className="text-2x rounded-[50%] border-white-color border-[2px]"  /></a></span>

      <article className="flex flex-col w-90c items-center mt-10up">
        <span className=" Large:text-left">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <span className="text-sky-500">—</span>
              <time className="text-gray-400 text-sm">  {blog.date?.toDate().toLocaleDateString()}</time>
              <i></i>
              <i></i>
              <time className="text-gray-400 text-sm">{`${readingTime} min read`}</time>
            </div>
            <div className="flex gap-4 text-1x+">
              <IoMdShare onClick={copyLink} className="cursor-pointer" />
              <a href="https://twitter.com/anshumancdx"  className="cursor-pointer" ><FaXTwitter /></a>
              
            </div>
          </div>

          <h1 className="mt-4 text-xl font-bold flex justify-center w-full Large:text-2x">
            {blog.title}
          </h1>
          
        </span>
        <p  className="w-90c Large:w-50c mt-5gen prose  lg:prose-xl prose-gray">{blog.intro}</p>
        <img  src={blog.primaryimg} alt={blog.title} className="mt-5gen w-300pwx Large:w-600pwx" />
        <div className="prose pl-1 pr-1 lg:w-full lg:prose-xl prose-gray">

         <p className="prose lg:prose-xl text-gray-600 prose-gray prose-strong:text-gray-400 prose-h2:text-gray-300 prose-h4:text-gray-400">{parse(blog.content)}</p>

        </div>
      </article>
    </div>
  );
};

export default Blog;
