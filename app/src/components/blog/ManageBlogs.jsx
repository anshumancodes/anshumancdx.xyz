import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/Firebase";



const ManageBlogs = () => {
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
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 space-y-6 z-10">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>

        {/* Blog List Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Blog List</h2>
          <div className="h-[400px] overflow-y-auto rounded-md border border-gray-200 mt-4 p-4">
          {blogs ? (
            blogs.length > 0 ? (
              blogs.map((blog) => (
                
                
                <div className="border border-gray-500 mb-2">
                  
                  <h2 className="text-2xl mb-2">{blog.title}</h2>
                  
                  <span>slug/id : <a className="text-gray-500">{blog.id}</a></span>
                  <a href={`/blog/${blog.id}`} className="text-blue-500 block mt-3">Read more</a>
                  
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
        </div>

        {/* Blog Actions Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Blog Actions</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter blog slug or ID"
              className="border p-2 w-full md:max-w-md rounded-md"
            />
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                Undraft
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Archive
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alternating Blocks - Decorative Background */}
    
    </div>
  );
};

export default ManageBlogs;


