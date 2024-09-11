import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Footer from "../Footer";
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
      {/* <div className="w-full justify-center flex text-1x+">
        Subscribe to the newsletter
      </div> */}
      {/* <iframe
        src="https://anshumancdx.substack.com/embed"
        className="mt-5 bg-inherit"
      ></iframe> */}

      <section className="py-20">
        <h1 className="mb-12 text-center font-sans text-5xl font-bold">
          Recent Posts
        </h1>
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {blogs ? (
            blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className=" rounded-lg shadow-md overflow-hidden" style={{ height: '500px' }}>
                <div className="h-[20vh]">
                  <img src={blog.primaryimg} alt={blog.title} className="h-[90%] w-full object-cover" />
                </div>
                <div className="px-5">
                  <p className="text-blue-500 font-bold text-lg mb-2">{blog.topic ? blog.topic : "Technology"}</p>
                  <h2 className="text-2xl mb-2">{blog.title}</h2>
                  <p className="text-gray-600">{blog.intro ? blog.intro : "No Blog intro found"}</p>
                  <a href={`/blog/${blog.id}`} className="text-blue-500 block mt-3">Read more</a>
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
