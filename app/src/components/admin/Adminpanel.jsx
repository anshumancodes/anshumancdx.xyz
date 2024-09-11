import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/Firebase";
import Texteditor from "../blog/Texteditor";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Adminpanel = () => {
  const [blogs, setBlog] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const blogquery = query(blogsRef, orderBy("date", "desc"));
        const blogsSnapshot = await getDocs(blogquery);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlog(blogsList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="sm:flex-col lg:flex lg:flex-row gap-[1vw] bg-black-bg h-[100vh]">
      <div className="bg-white-color p-5 rounded-[21px] lg:ml-[1vw] mt-5 text-black lg:w-[40%] sm:w-[90%] overflow-auto">
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Create Blog</h2>
        <div>
        <div className="">
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
            <label class="">Enter Blog title</label>
            <input
              type="text"
              placeholder="Enter Blog title"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none text-black"
            />
          </div>
          <div className="mt-10">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              blog body/content
            </label>
            {/* <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your blog here"
            ></textarea> */}
            <Texteditor/>
            <a><button className="bg-green-500 px-4 py-2 mt-3" >Create Blog</button></a>
          </div>
        </div>
      </div>

    
      <div className="mt-5 p-5 bg-white-color text-black lg:w-[40%] rounded-[21px] sm:w-[90%] overflow-auto">
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Blog editing panel</h2>
        <div>
          {blogs ? (
            blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row"
                  key={blog.id}
                >
                
                  <div className="flex  flex-row  gap-4 p-4 lg:p-6 bg-gray-300 w-full">
                    <div className="flex flex-col gap-2 w-[90%]">
                    <h3 className="font-bold">{blog.title}</h3>
                    <p>{blog.intro}</p>
               
                    <a
                      href={`/blog/${blog.id}`}
                      className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Read more
                    </a>
                    </div>
                    <div className="flex flex-col gap-2 text-xl font-bold">
                      <CiEdit/>
                      <MdDeleteForever/>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full flex justify-center items-center">No blogs available</p>
            )
          ) : (
            <p className="w-full flex justify-center items-center">loading...</p>
          )}
        </div>
      </div>

     



       {/* ignore these for now  */}
      <div className="mt-5  text-black lg:w-[20%] sm:w-[90%] lg:mr-[1vw]">

        <div className=" bg-white-color rounded-[21px] p-5 h-[70vh] overflow-auto" >
        <h2 className="mb-6 text-xl font-semibold lg:text-2xl">Work enquires</h2>
        </div>

        <div className="mt-10 bg-gray-color text-white-color rounded-[21px] p-3 h-200phx">
            <p>Total views:</p>
            <p>Total views:</p>
            <p>Total views:</p>

        </div>

      </div>


     
    </div>
  );
};

export default Adminpanel;

