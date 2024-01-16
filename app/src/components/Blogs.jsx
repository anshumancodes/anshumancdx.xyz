import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { collection, doc, getDocs,query,orderBy } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Footer from "./Footer";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

// ... (previous imports)

const Blogs = ({ isDarkMode, toggleMode }) => {
  const [blogs, setBlog] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const blogquery = query(blogsRef, orderBy("date", "desc"));
        const blogsSnapshot = await getDocs(blogquery);
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

  return (
    <div className={`h-fit ${isDarkMode ? "dark" : "light"} flex flex-col`}>
      <Nav toggleMode={toggleMode} isDarkMode={isDarkMode} />
      <div className="w-full justify-center flex text-1x+">
        Subscribe to the newsletter
      </div>
      <iframe
        src="https://anshumancdx.substack.com/embed"
        className="mt-5 bg-inherit"
      ></iframe>

      <div className="w-full justify-center flex text-1x+ mt-5 font-bold">
        latest Articles{" "}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8 mt-10up">
        {blogs ? (
          blogs.length > 0 ? (
            
            blogs.map((blog) => (
              <div
                class="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row"
                key={blog.id}
              >
                <a
                  href="#"
                  class="group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48"
                >
                  <img
                    src={blog.primaryimg}
                    loading="lazy"
                    alt={blog.title}
                    class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div class="flex flex-col gap-2 p-4 lg:p-6">
                  <span class="text-sm text-gray-400">  {blog.date?.toDate().toLocaleDateString()}</span>

                  <h2 class="text-xl font-bold ">
                    <a href="#">{blog.title}</a>
                  </h2>

                  <p class="text-gray-500">{blog.intro}</p>

                  <div>
                    <a
                      href={`/blog/${blog.id}`}
                      class="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
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
      <Footer />
    </div>
  );
};

export default Blogs;
