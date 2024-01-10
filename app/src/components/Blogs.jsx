
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

// ... (previous imports)

const Blogs = ({ isDarkMode, toggleMode }) => {
  const [blogs, setBlog] = useState();

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
        setBlog(blogsList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const maxLength = 80;

  return (
    <div className={`h-fit ${isDarkMode ? "dark" : "light"} flex flex-col`}>
      <Nav toggleMode={toggleMode} isDarkMode={isDarkMode} />
      <div className="w-full justify-center flex text-1x+">Subscribe to the newsletter</div>
      <iframe src="https://anshumancdx.substack.com/embed" className="mt-5 bg-inherit"></iframe>


      <div className="w-full justify-center flex text-1x+ mt-5">latest blogs </div>
      <div className="mt-10up grid gap-8 lg:grid-cols-2 ml-4 mr-4">
        
        {blogs ? (
          blogs.length > 0 ? (
            blogs.map((blog) => (
              
              <article   className={`flex flex-col items-center gap-4 md:flex-row lg:gap-6 ${isDarkMode ? "darkbtnbg" : "light border-[2px]"} `} >
        <a href="#" class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
          <img src={blog.primaryimg} loading="lazy" alt="" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-400">{blog.date}</span>

          <h2 class="text-xl font-bold transition duration-100 hover:text-blue-500 active:text-blue-600 cursor-pointer">
            {blog.title}
          </h2>

          <p class="text-gray-500"> {blog.intro.split(" ").slice(0, maxLength).join(" ")}</p>

          <div>
          <Link
                       to={`/blog/${blog.id}`}
                       className="text-blue-500 ml-1 flex items-center"
                     >
                       read more
                       <IoIosArrowRoundForward className="text-2x" />
                     </Link>
          </div>
        </div>
      </article>
            ))
          ) : (
            <p className="w-full flex justify-center items-center h-full">
              No blogs available
            </p>
          )
        ) : (
          <p className="w-full flex justify-center items-center">loading...</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
